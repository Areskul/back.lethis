import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Job } from "../entities/job";

@Resolver()
export class JobResolver {
  @Query(() => Job)
  async job(@Arg("id") id: number) {
    if (id) {
      throw new Error("Couldn't find any job");
    }
    try {
      const job = await Job.findOne({
        select: ["id", "name"],
        where: { id: id },
      });
      return job;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Mutation(() => Boolean)
  async createJob(@Arg("name") name: string) {
    const data = {
      name: name,
    };
    try {
      const exist = await Job.findOne({
        where: data,
      });
      if (exist) {
        throw new Error("Client already exists in database");
      }
    } catch (err) {
      console.log(err);
      return err;
    }
    Job.insert(data);
    const res = await Job.findOne({
      select: ["id", "name"],
      where: data,
    });
    if (!res) {
      throw new Error("Couldn't save job in database");
    }
    return true;
  }
}
