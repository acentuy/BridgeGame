import { _decorator, Component, Button, Vec3, Node, EventTouch, Input, input } from 'cc';
import Global from "db://assets/scripts/Global";
const { ccclass, property } = _decorator;

@ccclass('Joystick')
export class Joystick extends Component {

    @property(Node) public handle: Node = null;
    private startPos: Vec3 = new Vec3();
    private maxMoveDistance: number = 110;

    onLoad() {
        this.startPos = this.handle.position.clone();
        this.handle.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);//отписаться
        this.handle.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        this.handle.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    onTouchMove(event: EventTouch) {
        const delta = event.getDelta();
        let newPos = this.handle.position.clone();
        newPos.y += delta.y;

        if (newPos.y > this.maxMoveDistance) {
            newPos.y = this.maxMoveDistance;
        } else if (newPos.y < -this.maxMoveDistance) {
            newPos.y = -this.maxMoveDistance;
        }
        this.handle.setPosition(newPos.x, newPos.y, newPos.z);

        Global.speedCar = Math.abs((newPos.y / this.maxMoveDistance));
    }

    onTouchEnd() {
        this.handle.setPosition(this.startPos);

        Global.speedCar = 0;
    }

}
