import { Vec3 } from 'cc';

export class PlayerParameters {

    private _speedMovement = 0;
    private _coinBalance  = 0;

    get speedMovement () { return this._speedMovement }
    get coinBalance () { return this._coinBalance }

    set speedMovement (number) { this._speedMovement = number }
    set coinBalance (number) { this._coinBalance = number }
}


