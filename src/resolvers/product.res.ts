import { Resolver, Query } from "type-graphql";
import { Product } from "../entities/product";

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  async products() {
    return Product.find();
  }
}
