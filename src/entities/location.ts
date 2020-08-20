import { ObjectType, Field } from "type-graphql";
import { Entity, BaseEntity, Column } from "typeorm";

@ObjectType()
@Entity()
export class Location extends BaseEntity {
  @Field()
  @Column("text", { unique: true })
  address: String;

  @Field()
  @Column()
  phone: String;
}
