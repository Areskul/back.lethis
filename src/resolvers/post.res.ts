import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Post } from "../entities/post";

@Resolver()
export class UserResolver {
  @Query(() => [Post])
  async posts() {
    try {
      const posts = await Post.find({
        select: ["id", "content", "user"],
      });
      return posts;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Mutation(() => Boolean)
  async createPost(@Arg("content") content: string) {
    try {
      const post = { content };
      await Post.insert(post);
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
