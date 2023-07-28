import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  OneToOne,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Category } from "./Category";
import { Order } from "./Order";
import { Food } from "./Food";
import { Upkeep } from "./Upkeep";

@ObjectType()
@Entity()
export class Reptile {
  @PrimaryGeneratedColumn()
  @Field()
  id?: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  scientificName!: string;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column({ nullable: true})
  animalPicture!: string;

  @Field()
  @Column("decimal", { scale: 2, nullable: true })
  price!: number;

  @Field()
  @Column()
  quantity!: number;

  @Field(() => Upkeep)
  @OneToOne(() => Upkeep, (upkeep) => upkeep.reptileId, { cascade: true, onUpdate: "CASCADE", eager: true })
  @JoinColumn({ name: "upkeep_id"})
  upkeep?: Upkeep;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.reptiles, {onDelete: "CASCADE"})
  @JoinColumn({ name: "category_id" })
  category?: Category;

  @ManyToMany(() => Order, (order) => order.reptileId)
  order?: Order;
}
