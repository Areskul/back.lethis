import { InputType, Field, ID } from "type-graphql";
import { Job } from "../entities/job";

@InputType()
export class JobInput implements Partial<Job> {
  @Field(() => ID, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string;
}
