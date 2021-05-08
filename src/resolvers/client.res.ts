import {
  Resolver,
  Query,
  Arg,
  Mutation,
  //Ctx
} from "type-graphql";
import { Client } from "../entities/client";
import { ClientInput } from "../types/client-input";
import { Job } from "../entities/job";
import { JobInput } from "../types/job-input";
//import { PlaceInput } from "../types/place-input";
//import { User } from "../entities/user";

//const jobRes = new JobResolver();

@Resolver()
export class ClientResolver {
  @Query(() => Client)
  async client(@Arg("id") id: string) {
    return Client.findOne(id);
  }
  @Query(() => [Client])
  async clients() {
    return Client.find({
      order: {
        lastname: "ASC",
        firstname: "DESC",
      },
    });
  }
  @Mutation(() => Client)
  async updateClient(
    @Arg("client") clientInput: ClientInput,
    @Arg("job", { nullable: true }) jobInput: JobInput
  ) {
    const clientData = Client.create(clientInput);
    const clientCond = clientInput.id ? { id: clientInput.id } : clientInput;
    clientInput.id
      ? await Client.update(clientInput.id, clientData)
      : await Client.save(clientData);
    let client = await Client.findOne({
      where: clientCond,
      relations: ["job"],
    });

    if (jobInput && jobInput.name) {
      console.log(jobInput);
      const jobData = Job.create(jobInput);
      jobInput.id
        ? await Job.update(jobInput.id, jobData)
        : await Job.save(jobData);
      const jobCond = clientInput.id ? { id: clientInput.id } : clientInput;
      const job = await Job.findOne(jobCond);
      client!.job = job!;
      client = await Client.save(client!);
    }

    return client;
  }

  async deleteClient(@Arg("id") id: string) {
    try {
      const client = await Client.findOne({
        select: ["id", "lastname", "firstname"],
        where: { id: id },
      });
      Client.delete({ id: id });
      return client;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  //@Column({ nullable: true })
}
