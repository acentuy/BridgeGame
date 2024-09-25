import { _decorator, Component, Animation, Button, Vec3, Node, EventTouch, Input, input } from 'cc';
import Global from "db://assets/scripts/Global";
const { ccclass, property } = _decorator;

@ccclass('Joystick')
export class Joystick extends Component {

    @property(Node) public handle: Node = null;
    @property(Node) public neon: Node = null;
    @property(Node) public cursor: Node = null;

    private startPos: Vec3 = new Vec3();
    private maxMoveDistance: number = 110;
    private anim: Animation = null;

    onLoad() {
        this.anim = this.node.getComponent(Animation);
        this.startPos = this.handle.position.clone();
        this.handle.on(Input.EventType.TOUCH_MOVE, this._onTouchMove, this);//отписаться
        this.handle.on(Input.EventType.TOUCH_END, this._onTouchEnd, this);
        this.handle.on(Input.EventType.TOUCH_CANCEL, this._onTouchEnd, this);
        this.handle.once(Input.EventType.TOUCH_START, this.stopAnimation, this);
    }
    private _onTouchMove(event: EventTouch) {
        const delta = event.getDelta();
        let newPos = this.handle.position.clone();
        newPos.y += delta.y;

        if (newPos.y > this.maxMoveDistance) {
            newPos.y = this.maxMoveDistance;
        } else if (newPos.y < -this.maxMoveDistance) {
            newPos.y = -this.maxMoveDistance;
        }
        this.handle.setPosition(newPos.x, newPos.y, newPos.z);

        Global.changeSpeedMovement(Math.abs((newPos.y / this.maxMoveDistance)));
    }

    private _onTouchEnd() {
        this.handle.setPosition(this.startPos);
        Global.changeSpeedMovement(0);
    }

    stopAnimation() {
        this.anim.stop();
        this.neon.active = false;
        this.cursor.active = false;
    }
}
