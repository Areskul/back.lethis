import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Job } from "../entities/job";
import { JobInput } from "../types/job-input";

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
  @Query(() => [Job])
  async jobs() {
    try {
      const jobs = await Job.find({
        order: {
          name: "ASC",
        },
      });
      return jobs;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Mutation(() => Boolean)
  async createJob(@Arg("job") jobInput: JobInput) {
    try {
      const exist = await Job.findOne({
        where: jobInput,
      });
      if (exist) {
        throw new Error("Job already exists in database");
      }
    } catch (err) {
      console.log(err);
      return err;
    }
    Job.insert(jobInput);
    const res = await Job.findOne({
      select: ["id", "name"],
      where: jobInput,
    });
    if (!res) {
      throw new Error("Couldn't save job in database");
    }
    return true;
  }
}
