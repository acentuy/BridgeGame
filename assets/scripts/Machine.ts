import { _decorator, Component, Node } from 'cc';
import Global from "db://assets/scripts/Global";
const { ccclass, property } = _decorator;

@ccclass('Machine')
export class Machine extends Component {
    @property private delta: number = 10;
    private startPosY: number = 0;
    start() {
        this.startPosY = this.node.position.y;
    }

    update(deltaTime: number) {
        if (Math.abs(this.node.position.y - this.startPosY) > this.delta) {
            console.log("END")
            Global.GlobalEvent.emit(Global.EVENTS.END_GAME);
        }
    }
}


