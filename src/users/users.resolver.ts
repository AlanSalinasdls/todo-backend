import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guard/gql-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async userByEmail(@Args('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return this.usersService.create(data);
  }
}
