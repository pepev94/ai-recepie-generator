import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./User";

export class StripeToken {
  @prop()
  public token?: string;

  @prop()
  public user_id?: Ref<User>;
}

const StripeTokenModel = getModelForClass(StripeToken);

export default StripeTokenModel;
