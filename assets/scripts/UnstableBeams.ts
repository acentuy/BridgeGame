import { _decorator, Component, RigidBody, Collider, ITriggerEvent, Camera, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UnstableBeams')
export class UnstableBeams extends Component {
    @property(Vec3) private initialForce: Vec3 = new Vec3(0, -100, 0);
    private _rigidBody: RigidBody = null;
    private _collider: Collider = null;

    onLoad() {
        this._rigidBody = this.getComponent(RigidBody);
        this._collider = this.getComponent(Collider);
        this._collider.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    private _onTriggerEnter(event: ITriggerEvent) {
        this._collider.off('onTriggerEnter', this._onTriggerEnter, this);
        this._collider.isTrigger = false;
        this._rigidBody.type = RigidBody.Type.DYNAMIC;
        this.scheduleOnce(this._destroyNode, 0.1);
    }

    private _destroyNode() {
        this._rigidBody.applyForce(this.initialForce);
    }
}


