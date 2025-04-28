import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<{ email: string; id: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateToken(token: string): Promise<any> {
    const decoded = this.jwtService.verify(token);
    return decoded;
  }

  generateToken(user: { email: string; id: string }) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async login(data: { email: string; password: string }) {
    const user = await this.validateUser(data.email, data.password);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    return {
      access_token: this.generateToken(user),
    };
  }

  async signup(user: { fullname: string; email: string; password: string }) {
    const newUser = await this.usersService.create({
      fullname: user.fullname,
      email: user.email,
      password: user.password,
    });

    return {
      access_token: this.generateToken(newUser),
    };
  }
}
