angular
	.module('components.game')
	.factory('BonusesFactory', function($log, Weapon, Vest) {
		
		function BonusesFactory(game) {
			this._game = game;
		}

		BonusesFactory.Types = {
			VEST: 'vest',
			WEAPON: 'weapon'
		};

		BonusesFactory.prototype.create = function(bonusData) {
			var bonus;
			switch(bonusData.type) {
				case BonusesFactory.Types.VEST:
					bonus = new Vest(this._game, bonusData);
					break;
				case BonusesFactory.Types.WEAPON:
					bonus = new Weapon(this._game, bonusData);
					break;
				default:
					$log.error('Undefined bonus type: ', bonusData.type);
					break;
			}
			
			return bonus;
		};

		return BonusesFactory;
	});