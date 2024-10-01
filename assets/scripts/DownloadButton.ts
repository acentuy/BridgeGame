import { _decorator, Component, tween, UIOpacity } from 'cc';
import Global from "db://assets/scripts/Global";

const { ccclass, property } = _decorator;

@ccclass('DownloadButton')
export class DownloadButton extends Component {
    start() {
        Global.globalEvent.on(Global.EVENTS.END_GAME,this._showEndGameScreen, this);
    }

    private _showEndGameScreen() {
        tween(this.node.getComponent(UIOpacity))
            .to(1, { opacity: 0 }, { easing: 'quadOut' })
            .call(() => {
                this.node.active = false;
            })
            .start();
    }
}


