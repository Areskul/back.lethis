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
        select: ["id", "content"],
        relations: ["user"],
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
    @PubSub("POSTS") publish: Publisher<Post>
  ) {
    if (!ctx.user) {
      throw new Error("Not logged in");
    }
    try {
      let post = { content: content, user: ctx.user } as Post;
      await Post.insert(post);
      post = (await Post.findOne({
        select: ["id", "content"],
        relations: ["user"],
        where: post,
      })) as Post;
      publish(post);
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Subscription(() => Post, { topics: "POSTS" })
  async newPost(data: Post): Promise<Post> {
    console.log("inSub");
    try {
      const post = await Post.findOne({
        select: ["id", "content"],
        relations: ["user"],
        where: data,
      });
      return post as Post;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
