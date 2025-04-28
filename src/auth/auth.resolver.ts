import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';
import { AuthResponse } from './dto/auth.response';
import { SignupInput } from './dto/signup.input';

@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean)
  async validateToken(@Args('token') token: string) {
    const result = await this.authService.validateToken(token);
    if (!result) {
      throw new Error('Invalid token');
    }
    return true;
  }

  @Mutation(() => AuthResponse)
  async login(@Args('data') data: AuthInput) {
    return this.authService.login(data);
  }

  @Mutation(() => AuthResponse)
  async signup(@Args('data') data: SignupInput) {
    return this.authService.signup(data);
  }
}
