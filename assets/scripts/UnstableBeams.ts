import { _decorator, Component, RigidBody, Collider, ITriggerEvent, Camera } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UnstableBeams')
export class UnstableBeams extends Component {
    @property private mass: number = 1;
    private _rigidBody: RigidBody = null;
    private _collider: Collider = null;
    private _mainCamera: Camera | null = null;

    onLoad() {
        this._rigidBody = this.getComponent(RigidBody);
        this._collider = this.getComponent(Collider);
        this._collider.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    private _onTriggerEnter(event: ITriggerEvent) {
        this._collider.off('onTriggerEnter', this._onTriggerEnter, this);
        this._collider.isTrigger = false;
        this._rigidBody.type = RigidBody.Type.DYNAMIC;
        this._rigidBody.mass = this.mass;

        this.scheduleOnce(this._destroyNode, 8);
    }

    private _destroyNode() {
        this.node.destroy();
    }
}


