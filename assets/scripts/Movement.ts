import { _decorator, Component, Vec3 } from 'cc';
import Global from "./Global";
const { ccclass, property } = _decorator;

@ccclass('Movement')
export class Movement extends Component {
    private _speed: number = 100;
    update(deltaTime: number) {
        const movement = new Vec3(1, 0, 0).multiplyScalar(Global.playerParameters.speedMovement * deltaTime * this._speed);
        this.node.translate(movement);
    }
}


