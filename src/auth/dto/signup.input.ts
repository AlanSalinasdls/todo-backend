import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignupInput {
  @Field()
  fullname: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
