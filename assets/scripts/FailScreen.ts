import { _decorator, Component, Node, Sprite, Color, tween, Vec3, UIOpacity } from 'cc';
import Global from "db://assets/scripts/Global";

const { ccclass, property } = _decorator;

@ccclass('FailScreen')
export class FailScreen extends Component {
    @property(Node) private endGameSprite: Node = null; // Спрайт завершения игры
    @property(Node) private darkOverlay: Node = null; // Затемнение экрана
    @property(Node) private oldButton: Node = null; // Исчезающая кнопка
    @property(Node) private newButton: Node = null; // Новая кнопка, появляющаяся в центре

    start() {
        Global.globalEvent.on(Global.EVENTS.END_GAME,this._showEndGameScreen, this);
    }

    private _showEndGameScreen() {
        this.node.active = true;
        this.endGameSprite.active = true;
        tween(this.endGameSprite.getComponent(UIOpacity))
            .to(1, { opacity: 255 }, { easing: 'quadIn' })
            .start();
        this.darkOverlay.active = true;
        tween(this.darkOverlay.getComponent(UIOpacity))
            .to(2, { opacity: 175 }, { easing: 'quadIn' })
            .start();
        tween(this.oldButton.getComponent(UIOpacity))
            .to(1, { opacity: 0 }, { easing: 'quadOut' })
            .call(() => {
                this.oldButton.active = false;
                this._showNewButton();
            })
            .start();
    }

    private _showNewButton() {
        // 4. Появление новой кнопки в центре с анимацией scale, rotation, opacity
        this.newButton.active = true;
        this.newButton.setScale(new Vec3(0, 0, 0)); // Начальный размер
        this.newButton.eulerAngles = new Vec3(0, 0, 45); // Начальное вращение
        const newButtonOpacity = this.newButton.getComponent(UIOpacity);
        newButtonOpacity.opacity = 0; // Начальная прозрачность

        tween(this.newButton) // Анимация масштаба и вращения узла
            .parallel(
                tween().to(1, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' }), // Увеличение масштаба
                tween().to(1, { eulerAngles: new Vec3(0, 0, 0) }, { easing: 'quadInOut' }) // Вращение
            )
            .start();

        tween(newButtonOpacity) // Анимация прозрачности компонента UIOpacity
            .to(1, { opacity: 255 }, { easing: 'quadInOut' })
            .call(() => {
                this._startButtonPulse(); // Начинаем пульсацию кнопки
            })
            .start();
    }


    private _startButtonPulse() {
        // 5. Пульсирование кнопки (увеличение и уменьшение размера)
        const pulseTween = tween(this.newButton)
            .repeatForever(
                tween()
                    .to(0.5, { scale: new Vec3(1.1, 1.1, 1.1) }, { easing: 'quadInOut' }) // Увеличение
                    .to(0.5, { scale: new Vec3(1, 1, 1) }, { easing: 'quadInOut' }) // Уменьшение
            );
        pulseTween.start();
    }
}


