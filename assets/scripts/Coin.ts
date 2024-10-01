import { _decorator, Component, Node, Collider, Vec3, math, ParticleSystem } from 'cc';
import Global from "db://assets/scripts/Global";
const { Quat } = math;
const { ccclass, property } = _decorator;

@ccclass('Coin')
export default class Coin extends Component {
    @property(ParticleSystem) private particleSystem: ParticleSystem = null;
    private _collider: Collider = null;
    private _rotationSpeed: number = 100;

    onLoad() {
        this._collider = this.getComponent(Collider);
        this._collider.on('onTriggerEnter', this._onTriggerEnter, this);
    }
    update(deltaTime: number) {
        if (this.node.active)
            this.node.rotate(Quat.fromEuler(new Quat(), 0, 0, this._rotationSpeed * deltaTime));
    }

    private _onTriggerEnter() {;
        this._collider.off('onTriggerEnter', this._onTriggerEnter, this);
        this.particleSystem.play();
        Global.addCoinBalance(1)
        this.node.active = false;
    }
}


