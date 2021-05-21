import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity as Base,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity({
  name: "base",
  orderBy: {
    createdAt: "DESC",
  },
})
export abstract class BaseEntity extends Base {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn()
  id: string;
  @Field({ nullable: true })
  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;
  @Field({ nullable: true })
  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date;
}
