import { getModelForClass, prop } from "@typegoose/typegoose";

export class Recepie {
  public _id?: string;

  @prop()
  public title?: string;

  @prop()
  public language?: string;

  @prop()
  public slug?: string;

  @prop()
  public email?: string;

  @prop()
  public createdAt?: Date;

  @prop()
  public ingredients?: string;

  @prop({ default: 0 })
  public views?: number;

  @prop()
  public steps?: string;

  @prop()
  public type?: string;

  @prop()
  public img?: string;
}

const RecepieModel = getModelForClass(Recepie);

export default RecepieModel;
