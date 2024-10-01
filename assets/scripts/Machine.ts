import { _decorator, Component, RigidBody, Vec3, Collider } from 'cc';
import Global from "db://assets/scripts/Global";
const { ccclass, property } = _decorator;

@ccclass('Machine')
export class Machine extends Component {
    @property private delta: number = 5;
    @property private speed: number = 12;
    private _startPosY: number = 0;
    private readonly _LOCAL_END_GAME: string = "end-game";

    onLoad() {
        Global.machine = this.node;
    }

    start() {
        this._startPosY = this.node.position.y;
        this.node.once(this._LOCAL_END_GAME, this._endGame, this);
    }

    update(deltaTime: number) {
        if (this.node.position.y - this._startPosY < -this.delta) {
            this.node.emit(this._LOCAL_END_GAME);
        }
        else {
            const movement = new Vec3(1, 0, 0).multiplyScalar(Global.playerParameters.speedMovement * deltaTime * Math.abs(this.speed - Math.abs(this.node.position.y)));
            this.node.translate(movement);
        }
    }

    private _endGame() {
        this.node.getComponent(RigidBody).type = RigidBody.Type.KINEMATIC;
        this.node.getComponent(Collider).enabled = false;
        this.node.children.forEach(child => {
            child.getComponent(Collider).enabled = true;
            child.getComponent(RigidBody).type = RigidBody.Type.DYNAMIC;
        });
        this.scheduleOnce(() => this._stopMachine(), Global.failTimer);
    }

    private _stopMachine() {
        Global.globalEvent.emit(Global.EVENTS.END_GAME);
        this.node.children.forEach(child => {
            child.getComponent(RigidBody).type = RigidBody.Type.STATIC;
        })
        this.node.getComponent(RigidBody).type = RigidBody.Type.STATIC;
    }
}
