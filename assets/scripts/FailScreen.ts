import { _decorator, Component, Node, Sprite, Color, tween, Vec3, UIOpacity } from 'cc';
import Global from "db://assets/scripts/Global";

const { ccclass, property } = _decorator;

@ccclass('FailScreen')
export class FailScreen extends Component {
    @property(Node) private endGameSprite: Node = null;
    @property(Node) private darkOverlay: Node = null;
    @property(Node) private newButton: Node = null;

    start() {
        Global.globalEvent.on(Global.EVENTS.END_GAME,this._showEndGameScreen, this);
    }

    private _showEndGameScreen() {
        this.darkOverlay.active = true;
        tween(this.endGameSprite.getComponent(UIOpacity))
            .to(1, { opacity: 255 }, { easing: 'quadIn' })
            .start();
        tween(this.darkOverlay.getComponent(UIOpacity))
            .to(2, { opacity: 175 }, { easing: 'quadIn' })
            .start();
        this._showNewButton();
    }

    private _showNewButton() {
        this.newButton.setScale(new Vec3(0, 0, 0));
        this.newButton.eulerAngles = new Vec3(0, 0, 45);
        const newButtonOpacity = this.newButton.getComponent(UIOpacity);
        newButtonOpacity.opacity = 0;

        tween(this.newButton)
            .parallel(
                tween().to(1, { scale: new Vec3(0.5, 0.5, 0.5) }, { easing: 'backOut' }),
                tween().to(1, { eulerAngles: new Vec3(0, 0, 0) }, { easing: 'quadInOut' })
            )
            .start();
        tween(newButtonOpacity)
            .to(1, { opacity: 255 }, { easing: 'quadInOut' })
            .call(() => {
                this._startButtonPulse();
            })
            .start();
    }

    private _startButtonPulse() {
        const pulseTween = tween(this.newButton)
            .repeatForever(
                tween()
                    .to(0.5, { scale: new Vec3(0.7, 0.7, 0.7) }, { easing: 'quadInOut' })
                    .to(0.5, { scale: new Vec3(0.5, 0.5, 0.5) }, { easing: 'quadInOut' })
            );
        pulseTween.start();
    }
}


