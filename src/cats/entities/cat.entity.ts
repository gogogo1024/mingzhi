import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({ default: 0 })
  recommendations: number;

  @Column()
  breed: string;

  // 意味着cat是flavor的owner
  @JoinTable()
  @ManyToMany((_type) => Flavor, (flavor) => flavor.cats, {
    cascade: true,
  })
  flavors: Flavor[];
}
