import { _decorator, Component, Node, SpriteFrame, Sprite, resources, Layers } from 'cc';
import Global from "db://assets/scripts/Global";
const { ccclass, property } = _decorator;

@ccclass('CoinBar')
export class CoinBar extends Component {
    private _digitSprites: Record<string, SpriteFrame> = {};

    onLoad() {
        this._loadDigitSprites();
        Global.globalEvent.on(Global.EVENTS.ADD_COIN, this._setNumber, this);
    }

    private _loadDigitSprites() {
        const path: string = 'UI/numbers';
        resources.loadDir(path, SpriteFrame, (err, assets: SpriteFrame[]) => {
            if (!err) {
                assets.forEach(spriteFrame => {
                    const name = spriteFrame.name;
                    this._digitSprites[name] = spriteFrame;
                });
            }
            else {
                console.error('Failed to load digit sprites:', err);
            }
        });
    }

    private _setNumber(count: number) {
        this.node.removeAllChildren();
        const digits = count.toString().split('');

        digits.forEach(digit => {
            const digitNode = new Node();
            digitNode.addComponent(Sprite).spriteFrame = this._digitSprites[digit];
            digitNode.layer = Layers.Enum.UI_2D;
            this.node.addChild(digitNode);
        });
    }
}
