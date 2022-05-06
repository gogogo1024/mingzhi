import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Dog extends Document {
  @Prop()
  name: string;
  @Prop()
  type: string;

  @Prop({ default: 0 })
  recommendations: number;

  @Prop()
  flavors: string[];
}
export const DogSchema = SchemaFactory.createForClass(Dog);
