import {
  Subscription,
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  PubSub,
  Publisher,
  Args,
  Root,
  //PubSubEngine,
} from "type-graphql";
//import { BaseEntity } from "typeorm";

import { User } from "../entities/user";
import { Post } from "../entities/post";
import { Sort, sorter } from "./base.res";

@Resolver(() => Post)
export class PostResolver {
  @Query(() => [Post])
  async posts(@Args() { field, direction }: Sort) {
    try {
      const posts = await Post.find({
        select: ["id", "content", "createdAt"],
        relations: ["user"],
      });
      if (field && direction) {
        const sorted = sorter(posts, field!, direction);
        return sorted;
      } else {
        return posts;
      }
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
      const res = await Post.insert(post);
      post = res.identifiers[0] as Post;
      await publish(post);
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Mutation(() => Boolean)
  async likePost(
    @Ctx() ctx: any,
    @Arg("post") post: Post
    //@PubSub("POSTS") publish: Publisher<Post>
  ) {
    if (!ctx.user) {
      throw new Error("Not logged in");
    }
    try {
      const user = await User.findOne({
        select: ["id", "name", "email"],
        where: ctx.user,
      });
      post = (await Post.findOne({
        select: ["id", "like"],
        where: post,
      })) as Post;
      const like = post.like.push(user!);
      console.log(post);

      console.log(like);

      //Post.update(post!, { like: like });

      //await publish(post);
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Subscription(() => Post, { topics: "POSTS" })
  async newPost(@Root() payload: Post): Promise<Post> {
    try {
      const post = await Post.findOne({
        select: ["id", "content", "createdAt"],
        relations: ["user"],
        where: payload,
      });
      return post as Post;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
