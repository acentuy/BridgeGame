import { _decorator, Component, Node, Vec3 } from 'cc';
import Global from "db://assets/scripts/Global";
const { ccclass, property } = _decorator;

@ccclass('Camera')
export class Camera extends Component {
    private _target: Node = null;
    private _offset: Vec3 = new Vec3();
    private _deltaSpeed: number = 5;

    start() {
        this._target = Global.machine;
        this._offset =  this.node.getWorldPosition().subtract(this._target.getWorldPosition());
    }

    update(deltaTime: number) {
        const desiredPos = Vec3.add(new Vec3(), this._target.getWorldPosition(), this._offset);
        this.node.setWorldPosition(Vec3.lerp(new Vec3(), this.node.getWorldPosition(), desiredPos, deltaTime * this._deltaSpeed));
        this.node.lookAt(this._target.getWorldPosition());
    }
}


