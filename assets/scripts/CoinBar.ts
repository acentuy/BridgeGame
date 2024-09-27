import { _decorator, Component, Node, SpriteFrame, Sprite, resources, Layers } from 'cc';
import Global from "db://assets/scripts/Global";
const { ccclass, property } = _decorator;

@ccclass('CoinBar')
export class CoinBar extends Component {
    private _digitSprites: SpriteFrame[] = [];

    onLoad() {
        this._loadDigitSprites();
        Global.globalEvent.on(Global.EVENTS.ADD_COIN, this._setNumber, this);
    }

    private _loadDigitSprites() {
        const path: string = 'UI/numbers';
        resources.loadDir(path, SpriteFrame, (err, assets: SpriteFrame[]) => {
            if (!err) this._digitSprites = assets;
            else console.error('Failed to load digit sprites:', err);
        });
    }

    private _setNumber() {
        this.node.removeAllChildren();

        const digits = Global.playerParameters.coinBalance.toString().split('');

        digits.forEach(digit => {
            const digitNode = new Node();
            const sprite = digitNode.addComponent(Sprite);
            const digitIndex = parseInt(digit);

            sprite.spriteFrame = this._digitSprites[digitIndex];
            digitNode.layer = Layers.Enum.UI_2D;

            this.node.addChild(digitNode);
        });
    }
}
