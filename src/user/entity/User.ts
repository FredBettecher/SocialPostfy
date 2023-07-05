import { HttpException, HttpStatus } from "@nestjs/common";
import { randomUUID } from "crypto";
import { format } from "date-fns";


export class User {
  constructor(
    private _name: string,
    private _email: string,
    private _password: string,
    private _avatar: string,
    readonly _id: string = randomUUID(),
    readonly _createdAt: string = format(Date.now(), 'dd/MM/yyyy HH:mm')
  ) {}

  set name(name: string) {
    if(name.length < 3) throw new HttpException('Invalid name', HttpStatus.UNPROCESSABLE_ENTITY);
    this._name = name;
  }

  set email(email: string) {
    this._email = email;
  }

  set password(password: string) {
    this._password = password;
  }

  set avatar(avatar: string) {
    this._avatar = avatar;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get avatar() {
    return this._avatar;
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }
}
