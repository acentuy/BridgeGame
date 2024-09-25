export default class Global {
    private static _instance: Global

    private _speedCar = 0

    static get instance() { return this._instance || (this._instance = new Global()) }
    static get speedCar () { return Global.instance._speedCar }

    static set speedCar (number) { Global.instance._speedCar = number }
}


