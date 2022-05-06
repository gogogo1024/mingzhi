import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
@Schema()
export class Address {
  @Prop()
  type: string;

  @Prop()
  name: string;

  @Prop({ type: mongoose.SchemaTypes.Mixed, default: {} })
  payload: Record<string, any>;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
