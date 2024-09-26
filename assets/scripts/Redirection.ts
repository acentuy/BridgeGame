import { _decorator, Component, Node } from 'cc';
import { sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Redirection')
export class Redirection extends Component {
    redirect() {
        const androidStoreURL = "https://play.google.com/store/apps/details?id=com.LuB.DeliveryConstruct&hl=en";
        const iosStoreURL = "https://apps.apple.com/us/app/ride-master-car-builder-game/id6449224139";

        if (sys.platform === sys.Platform.ANDROID) {
            sys.openURL(androidStoreURL);
        } else if (sys.platform === sys.Platform.IOS) {
            sys.openURL(iosStoreURL);
        } else {
            console.error("Unknown platform");
        }
    }
}


