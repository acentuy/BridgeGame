import { _decorator, Component, Animation, Button, Vec3, Node, EventTouch, Input, input } from 'cc';
import Global from "db://assets/scripts/Global";
const { ccclass, property } = _decorator;

@ccclass('Joystick')
export class Joystick extends Component {

    @property(Node) private handle: Node = null;
    @property(Node) private neon: Node = null;
    @property(Node) private cursor: Node = null;

    private _startPos: Vec3 = new Vec3();
    private _maxMoveDistance: number = 110;
    private _anim: Animation = null;

    onLoad() {
        this._anim = this.getComponent(Animation);
        this._startPos = this.handle.position.clone();
        this.handle.on(Input.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.handle.on(Input.EventType.TOUCH_END, this._onTouchEnd, this);
        this.handle.on(Input.EventType.TOUCH_CANCEL, this._onTouchEnd, this);
        this.handle.once(Input.EventType.TOUCH_START, this._stopAnimation, this);
    }
    private _onTouchMove(event: EventTouch) {
        const delta = event.getDelta();
        let newPos = this.handle.position.clone();
        newPos.y += delta.y;

        if (newPos.y > this._maxMoveDistance)
            newPos.y = this._maxMoveDistance;
        else if (newPos.y < -this._maxMoveDistance)
            newPos.y = -this._maxMoveDistance;

        this.handle.setPosition(newPos.x, newPos.y, newPos.z);

        Global.playerParameters.speedMovement = Math.pow((newPos.y + this._maxMoveDistance) / (2 * this._maxMoveDistance), 3);
    }

    private _onTouchEnd() {
        this.handle.setPosition(this._startPos);
        Global.playerParameters.speedMovement = 0;
    }

    private _stopAnimation() {
        this._anim.stop();
        this.neon.active = false;
        this.cursor.active = false;
    }
}
