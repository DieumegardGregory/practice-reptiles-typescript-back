import { ObjectType, Field } from "type-graphql";
import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToMany,
    JoinTable
} from "typeorm";
import { Reptile } from "./Reptile";
import { Order } from "./Order";

@ObjectType()
@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  @Field()
  id?: number;

  @Column()
  @Field()
  foodName!: string;

  @Column( 'decimal', { scale: 2, nullable: true } )
  @Field()
  foodPrice!: number;

  @Column()
  @Field()
  foodCategory!: string;

  @Field()
  @Column({ nullable: true})
  foodPicture!: string;

  @Field(() => Order)
  @ManyToMany(() => Food, (food) => food.order)
  @JoinTable()
  order!: Order;
}