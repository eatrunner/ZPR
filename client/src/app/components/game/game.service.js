/**
 * @ngdoc service
 * @name components.game.service:GameService
 * @requires $http
 * @requires $q
 * @requires $rootScope
 * @requires GAME_EVENTS
 * @requires GAME_DIRECTIONS
 * @requires GAME_STATUSES
 * @description
 * Provides HTTP connection with GameAPI. 
 * It is also using to manage game session.
 *
 * It handles whole game creation/runtime process. 
 * # How to use it
 * 1. Before you create a new game, you should obtain available maps list. 
 * To do it, you should call `getAvailableMaps`.
 * 2. Using one of the following `map_id` from `getAvailableMaps` you can now create a new game.
 * To do it, use `createGame` function with provided `map_id`.
 * 3. When game has been created, you can now call `startGame` to run it on server.
 * 4. After start, you can do:
 *   * Check game status, score and entities placement with `getState`. 
 *   * Control the game with `movePlayer` and `playerShoot`
 *   * Pause the game using `pauseGame` and then resume it with `resumeGame`
 * 5. If game ends:
 *   * if you won, start the next level with `continueGame` request
 *   * if you lost, delete the game level with `deleteGame` request
*/
function GameService($http, $q, $rootScope, GameSession, GAME_EVENTS, GAME_DIRECTIONS, GAME_STATUSES) {
    var service = {
        getAvailableMaps: getAvailableMaps,

        createGame: createGame,
        deleteGame: deleteGame,
        getGameInfo: getGameInfo,
        startGame: startGame,
        continueGame: continueGame,
        pauseGame: pauseGame,
        resumeGame: resumeGame,

        updateState: updateState,
        movePlayer: movePlayer,
        playerShoot: playerShoot,
    };

    var API_GAME_PREFIX = '/tank-game/ajax/game';

    /**
     * @ngdoc method
     * @name isGameCreated
     * @methodOf components.game.service:GameService
     * @description This method tells if there is created game. 
     * It can be useful inside router, that is checking this flag every transitionStart.
     * @returns {boolean} whether game is created or not
     */
    function isGameCreated() {
        return !!GameSession.gameId;
    }

    /**
     * @ngdoc method
     * @name createGame
     * @methodOf components.game.service:GameService
     * @description Creates particle game with providen `map_id`. 
     * If game is successfully created, it is in STOP state and 
     * user have to send `startGame` request to play the game.
     * @return {Promise} A promise representing game creation process.
     * 
     * **Possible success values:**
     *   * `gameId` - created game ID.
     * 
     * **Possible rejection values:**
     *   * `WrongMapIdError` - when choosen `map_id` is wrong,
     *   * `HttpError` - when error is caused by $http service
     */
    function createGame(mapId) {
        return $q(function(resolve, reject) {
            $http.get(API_GAME_PREFIX + '/creategame/', {
                params: {
                    map_id: mapId
                }
            }).then(createGameCallback, reject);

            function createGameCallback(response) {
                if(response.error)
                    reject(response.error);
                else {
                    GameSession.gameId = (response.data.game_id);
                    resolve();
                }
            }
        });
    }

    /**
     * @ngdoc method
     * @name getAvailableMaps
     * @methodOf components.game.service:GameService
     * @description Fetches from server list of `map_id`values, 
     * that user can use in call to `startGame` request
     * @return {Promise} A promise representing game creation process.
     * 
     * **Possible success values:**
     *   * `Array<Number>` - contains `map_id` values, list of available maps.
     * 
     * **Possible rejection values:**
     *   * `HttpError` - when error is caused by $http service
     */
    function getAvailableMaps() {
        return $q(function(resolve, reject) {
            $http.get(API_GAME_PREFIX + '/getavalmaps/')
                .then(getAvailableMapsCallback, reject);

            function getAvailableMapsCallback(response) {
                if(response.error)
                    reject(response.error);
                else {
                    console.log(response.data.maps);
                    resolve(response.data.maps);
                }
            }
        });
    }

    /**
     * @ngdoc method
     * @name startGame
     * @methodOf components.game.service:GameService
     * @description Sends to server request to start the not-running game. 
     * Should be called only after `createGame`
     * @return {Promise} A promise representing game starting process.
     * 
     * **Possible success values:**
     *   * This function just resolves on success, without return value
     * 
     * **Possible rejection values:**
     *   * `GameArleadyRunningError` - when game is not in STOP state
     *   * `GameServerError` - internal error of game server
     *   * `HttpError` - when error is caused by $http service
     */
    function startGame() {
        return makeGET('/startgame/');
    }

    /**
     * @ngdoc method
     * @name pauseGame
     * @methodOf components.game.service:GameService
     * @description Sends to server request to pause the running game. 
     * Should be called only after `startGame` and before `resumeGame`
     * @return {Promise} A promise representing game pausing process.
     * 
     * **Possible success values:**
     *   * This function just resolves on success, without return value
     * 
     * **Possible rejection values:**
     *   * `GameNotRunningError` - when game could not be paused -
     *      when it is not in RUN state.
     *   * `GameServerError` - internal error of game server
     *   * `HttpError` - when error is caused by $http service
     */
    function pauseGame() {
        return makeGET('/pausegame/');
    }

    /**
     * @ngdoc method
     * @name resumeGame
     * @methodOf components.game.service:GameService
     * @description Sends to server request to resume the paused game. 
     * Should be called only after `startGame` and before `resumeGame`
     * @return {Promise} A promise representing game pausing process.
     * 
     * **Possible success values:**
     *   * This function just resolves on success, without return value
     * 
     * **Possible rejection values:**
     *   * `GameNotPausedError` - when game could not be resumed -
     *      when it is not in PAUSE state
     *   * `GameServerError` - internal error of game server
     *   * `HttpError` - when error is caused by $http service
     */
    function resumeGame() {
        return makeGET('/resumegame/');
    }

    /**
     * @ngdoc method
     * @name getGameInfo
     * @methodOf components.game.service:GameService
     * @description Fetches from server general informations about the game
     * Useful to run before `startGame` in order to check map size, starting map state, game status
     * @return {Promise} A promise representing getting game information process.
     * 
     * **Possible success values:**
     *   * `GameInfo` - object containing general information about the game. It has properties:
     *      * `mapWidth`, `mapHeight` - numbers, map size
     *      * `map` - Array, beginning map content
     *      * `playerId` - a number, unique ID of the player (usually 0),
     *      * `status` - an enum, one of the values from `GameStatuses` 
     * 
     * **Possible rejection values:**
     *   * `GameServerError` - internal error of game server
     *   * `HttpError` - when error is caused by $http service
     */
    function getGameInfo() {
        return makeGET('/getgameinfo');
    }

    function updateState() {
        return getState()
            .then(getStateCallback);
    }

    var oldState = {
        tanks: {},
        bullets: {},
        bonuses: {},
        map: {},
        status: {},
        score: {}
    };

    function getStateCallback(newState) {
        var checkList = {
            'status': GAME_EVENTS.STATUS_UPDATE,
            'score': GAME_EVENTS.SCORE_UPDATE,
            'map': GAME_EVENTS.MAP_UPDATE,
            'tanks': GAME_EVENTS.TANKS_UPDATE,
            'bullets': GAME_EVENTS.BULLETS_UPDATE,
            'bonuses': GAME_EVENTS.BONUSES_UPDATE
        };

        for(var key in checkList)
            if(!angular.equals(oldState[key], newState[key])) {
                $rootScope.$broadcast(checkList[key], 
                    newState[key], oldState[key]);
                oldState[key] = newState[key];
            }

        return $q.when(newState);
    }            

    /**
     * @ngdoc method
     * @name getState
     * @methodOf components.game.service:GameService
     * @description Fetches from server current state of the game. 
     * @return {Promise} A promise representing getting game state process.
     * 
     * **Possible success values:**
     *  * `GameState` - object containing current state of the game. Its properties:
     *      * `status` - an enum, one of the values from `Statuses`,
     *      * `map` - Array, current map content,
     *      * `tanks` - Array of Tank objects, which contains:
     *          * `x`, `y` - numbers, position of tank,
     *          * `dir` - an enum, direction of tank. One of the `Directions` values
     *          * `id` - a number
     *          * `bonus` - an enum, enhancement that this tank is owning. One of the `Bonuses` values
     *      * `bullets` - Array of Bullets objects, which contains:
     *          * `x`, `y` - numbers, position of bullet,
     *          * `dir` - an enum, direction of bullet. One of the `Direction` value
     *          * `id` - a number
     *      * `bonuses` - Array of Bonus objects, which contains:
     *          * `x`, `y` - numbers, positions of bonus,
     *          * `id` - a number,
     *          * `type` - an enum, type of bonus, one of the `Bonuses` value.
     *      * `score` - a number - total user's scorepoints during game,
     *
     * **Possible rejection values:**
     *  * *GameStateError* - when message from server contains errors.
     *  * `GameServerError` - internal error of game server
     *  * `HttpError` - when error is caused by $http service
     */
    function getState() {
        return makeGET('/getstate/');
    }

    /**
     * @ngdoc method
     * @name movePlayer
     * @methodOf components.game.service:GameService
     * @description Sends to server a request in order to move player. 
     * @param {Direction} direction direction, in which player's tank has to move
     * @return {Promise} A promise representing move player process.
     * **Possible success values:**
     *  * Functions just returns on success
     *
     * **Possible rejection values:**
     *   * `BadDirectionError` - when user used wrong direction type
     *   * `GameServerError` - internal error of game server
     *   * `HttpError` - when error is caused by $http service
     */
    function movePlayer(direction) {
        return makeGET('/moveplayer/', {
            dir: direction
        });
    }

    /**
     * @ngdoc method
     * @name playerShoot
     * @methodOf components.game.service:GameService
     * @description Sends to server a request informing, that player has shooted. 
     * @return {Promise} A promise representing shoot process.
     * **Possible success values:**
     *  * Functions just returns on success
     *
     * **Possible rejection values:**
     *   * `GameServerError` - internal error of game server
     *   * `HttpError` - when error is caused by $http service
     */
    function playerShoot() {
        return makeGET('/playershoot/');
    }

    function deleteGame() {
        return makeGET('/deletegame/');
    }

    function continueGame() {
        return makeGET('/continuegame/');
    }

    /**
        Internal function, that is making HTTP-GET request and is transforming 
        response answer into angular's $q promise
        */
    function makeGET(query, params) {
        return $q(function(resolve, reject) {
            if(angular.isUndefined(params)) 
                params = {};
            params.game_id = GameSession.gameId;
            $http.get(API_GAME_PREFIX + query, { params: params })
                .then(GETsuccess, reject);

            function GETsuccess(response) {
                resolve(response.data);
            }
        });
    }

    return service;
}

angular
  .module('components.game')
  .factory('GameService', GameService);
