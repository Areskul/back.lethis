import { ArgsType, Field, registerEnumType } from "type-graphql";
//import { Min, Max } from "class-validator";

@ArgsType()
export class Sort {
  @Field(() => String, { nullable: true, defaultValue: "createdAt" })
  field?: string;

  @Field(() => String, { nullable: true, defaultValue: "desc" })
  direction?: Direction;
}

enum Direction {
  asc = "asc",
  desc = "desc",
}

registerEnumType(Direction, {
  name: "Direction", // this one is mandatory
  description: "The order you want to sort your value by", // this one is optional
});

export function sorter(data: any, field: string, direction?: Direction): any {
  data.sort((a: any, b: any) => {
    if (direction == Direction.asc) {
      return ascSort(a, b, field);
    } else {
      return descSort(a, b, field);
    }
  });
  return data;
}

export function descSort(a: any, b: any, field: string) {
  if (!a.hasOwnProperty(field) || !b.hasOwnProperty(field)) {
    throw new Error("Couldn't find field name OR field contain a null value");
  }
  if ((a[field] as number) < (b[field] as number)) {
    return 1;
  }
  if ((a[field] as number) > (b[field] as number)) {
    return -1;
  }
  return 0;
}
export function ascSort(a: any, b: any, field: string) {
  if (!a.hasOwnProperty(field) || !b.hasOwnProperty(field)) {
    throw new Error("Couldn't find field name OR field contain a null value");
  }
  if ((a[field] as number) < (b[field] as number)) {
    return -1;
  }
  if ((a[field] as number) > (b[field] as number)) {
    return 1;
  }
  return 0;
}
