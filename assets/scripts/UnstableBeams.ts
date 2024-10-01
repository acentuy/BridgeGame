import { _decorator, Component, RigidBody, Collider, ITriggerEvent, Vec3 } from 'cc';
import Global from "db://assets/scripts/Global";
const { ccclass, property } = _decorator;

@ccclass('UnstableBeams')
export class UnstableBeams extends Component {
    @property private delay: number = 0.3;
    private _rigidBody: RigidBody = null;
    private _collider: Collider = null;
    private readonly _forceVec: Vec3 = new Vec3(0, -10000, 0);

    onLoad() {
        this._rigidBody = this.getComponent(RigidBody);
        this._collider = this.getComponent(Collider);
        this._collider.on('onTriggerEnter', this._onTriggerEnter, this);
        Global.globalEvent.on(Global.EVENTS.END_GAME,this._endGame, this);
    }

    private _onTriggerEnter(event: ITriggerEvent) {
        this._collider.off('onTriggerEnter', this._onTriggerEnter, this);
        this._collider.isTrigger = false;
        this.scheduleOnce(this._fallBeam, this.delay);
    }

    private _fallBeam() {
        this._rigidBody.type = RigidBody.Type.DYNAMIC;
        this._rigidBody.applyForce(this._forceVec);
    }

    private _endGame() {
        this._rigidBody.type = RigidBody.Type.KINEMATIC;
    }
}


