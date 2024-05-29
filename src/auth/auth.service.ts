import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }
  async create(createUserDto: CreateUserDto) {
    const isUserExist = await this.userService.findByUsername(createUserDto.username);
    if (isUserExist) {
      return {
        error: 'user already exist'
      }
    }
    const user = await this.userService.create(createUserDto);
    if (!user) {
      return {
        error: 'user could not be created'
      }
    }
    const payload = { sub: user.name, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOne(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.name, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user
    };
  }
}
