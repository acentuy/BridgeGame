import { _decorator, Component, Node, Collider, Vec3, math, systemEvent } from 'cc';
import Global from "db://assets/scripts/Global";
const { Quat } = math;
const { ccclass, property } = _decorator;

@ccclass('Coin')
export default class Coin extends Component {
    private _collider: Collider = null;
    private _rotationSpeed: number = 100;

    onLoad() {
        this._collider = this.getComponent(Collider);
        this._collider.on('onTriggerEnter', this._onTriggerEnter, this);
    }
    update(deltaTime: number) {
        this.node.rotate(Quat.fromEuler(new Quat(), 0, this._rotationSpeed * deltaTime, 0));
    }

    private _onTriggerEnter() {
        Global.addCoinBalance(1);
        this._collider.off('onTriggerEnter', this._onTriggerEnter, this);
        Global.GlobalEvent.emit(Global.EVENTS.ADD_COIN);
        this.node.destroy();
    }
}


