import {PlayerParameters} from "db://assets/scripts/PlayerParameters";
import { EventTarget } from 'cc';
export default class Global {
    private static _instance: Global
    private _playerParameters = new PlayerParameters();

    static get instance() { return this._instance || (this._instance = new Global()) }
    static get playerParameters () { return Global.instance._playerParameters }

    static addCoinBalance(count: number) {
        Global.playerParameters.coinBalance += count;
    }

    static readonly EVENTS = {
            ADD_COIN: "add-coin",
            END_GAME: "end-game"
    };
    static GlobalEvent = new EventTarget();
}


