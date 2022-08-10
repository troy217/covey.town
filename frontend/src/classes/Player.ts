export default class Player {
  public location?: UserLocation;

  private readonly _id: string;

  private readonly _userName: string;

  public sprite?: Phaser.GameObjects.Sprite;

  public label?: Phaser.GameObjects.Text;

  private _contacts: Player[];

  private _listeners: ContactsListener[] = [];

  constructor(id: string, userName: string, location: UserLocation, contacts: Player[]) {
    this._id = id;
    this._userName = userName;
    this.location = location;
    this._contacts = contacts;

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
    if(newContacts.length !== this._contacts.length || !newContacts.every((val, index) => val === this.contacts[index])){
      this._listeners.forEach(listener => listener.onContactsChange?.(newContacts));
      this._contacts = newContacts;
    }
  }

  addContacts(contact: Player): void{
    this._contacts.push(contact);
  }

  addListener(listener: ContactsListener) {
    this._listeners.push(listener);
  }

  removeListener(listener: ContactsListener) {
    this._listeners = this._listeners.filter(eachListener => eachListener !== listener);
  }

  static fromServerPlayer(playerFromServer: ServerPlayer): Player {
    return new Player(playerFromServer._id, playerFromServer._userName, playerFromServer.location, playerFromServer._contactsList);
  }
}
export type ServerPlayer = { _id: string, _userName: string, location: UserLocation, _contactsList: Player[] };

export type Direction = 'front'|'back'|'left'|'right';

export type UserLocation = {
  x: number,
  y: number,
  rotation: Direction,
  moving: boolean,
  conversationLabel?: string
};

export type ContactsListener = {
  onContactsChange?: (newContacts: Player[]) => void;
};
