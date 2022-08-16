export default class Player {
  public location?: UserLocation;

  private readonly _id: string;

  private readonly _userName: string;

  public sprite?: Phaser.GameObjects.Sprite;

  public label?: Phaser.GameObjects.Text;

  private _contacts: Player[];


  constructor(id: string, userName: string, location: UserLocation ) {
    this._id = id;
    this._userName = userName;
    this.location = location;
    this._contacts = [];

  }

  get userName(): string {
    return this._userName;
  }

  get id(): string {
    return this._id;
  }

  get contacts(): Player[]{
    return this._contacts;
  }

  set contacts(newContacts: Player[]) {
    this._contacts = newContacts;
  }

  static fromServerPlayer(playerFromServer: ServerPlayer): Player {
    return new Player(playerFromServer._id, playerFromServer._userName, playerFromServer.location );
  }
}
export type ServerPlayer = { _id: string, _userName: string, location: UserLocation };

export type Direction = 'front'|'back'|'left'|'right';

export type UserLocation = {
  x: number,
  y: number,
  rotation: Direction,
  moving: boolean,
  conversationLabel?: string
};
