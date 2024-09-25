import {PlayerParameters} from "db://assets/scripts/PlayerParameters";

export default class Global {
    private static _instance: Global
    private _playerParameters = new PlayerParameters();

    static get instance() { return this._instance || (this._instance = new Global()) }
    static get playerParameters () { return Global.instance._playerParameters }

    static changeSpeedMovement(count: number) {
        Global.playerParameters.speedMovement = count;
    }

    static addCoinBalance(count: number) {
        Global.playerParameters.coinBalance += count;
    }

}


