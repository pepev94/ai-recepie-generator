import { prop, getModelForClass } from "@typegoose/typegoose";

export class User {
  @prop()
  public name?: string;

  @prop()
  public email?: string;

  @prop({ default: 10 })
  public availableTokens?: number;
}

const UserModel = getModelForClass(User);

export default UserModel;
