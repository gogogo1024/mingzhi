import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
@Schema()
export class Address {
  @Prop()
  type: string;

  @Prop({ index: true })
  name: string;

  @Prop({ type: mongoose.SchemaTypes.Mixed, default: {} })
  payload: Record<string, any>;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
AddressSchema.index({ name: 1, type: -1 });
