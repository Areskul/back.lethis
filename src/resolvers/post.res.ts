import {
  Subscription,
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  PubSub,
  Publisher,
  //PubSubEngine,
} from "type-graphql";

import { Post } from "../entities/post";

@Resolver()
export class PostResolver {
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
  async createPost(
    @Ctx() ctx: any,
    @Arg("content") content: string,
    @PubSub("POSTS") publish: Publisher<string>
  ) {
    try {
      const post = { content: content, user: ctx.user };
      await Post.insert(post);
      publish("NewPost");

      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Subscription(() => [Post], { topics: "POSTS" })
  async newPost(): Promise<Post[]> {
    console.log("inSub");
    try {
      const posts = await Post.find({
        select: ["id", "content", "user"],
      });
      console.log(posts);
      return posts;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
