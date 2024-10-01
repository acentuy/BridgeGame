import {PlayerParameters} from "db://assets/scripts/PlayerParameters";
import { EventTarget, Node } from 'cc';
export default class Global {
    private static _instance: Global
    private readonly _failTimer: number  = 2;

    private _playerParameters = new PlayerParameters();
    private _machine = new Node();

    static get instance() { return this._instance || (this._instance = new Global()) }
    static get playerParameters () { return Global.instance._playerParameters }
    static get machine () { return Global.instance._machine }
    static get failTimer () { return Global.instance._failTimer }

    static set machine (node) { Global.instance._machine = node }

    static addCoinBalance(count: number) {
        Global.playerParameters.coinBalance += count;
        Global.globalEvent.emit(Global.EVENTS.ADD_COIN, Global.playerParameters.coinBalance);
    }

    static readonly EVENTS = {
            ADD_COIN: "add-coin",
            END_GAME: "end-game"
    };

    static globalEvent = new EventTarget();
}


