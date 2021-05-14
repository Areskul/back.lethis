import { Job } from "./entities/job";

export const seedDatabase = async () => {
  const empty = Job.create({
    name: "",
  });
  await Job.insert(empty);
};
