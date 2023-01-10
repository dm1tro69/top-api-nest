import {
  Controller,
  Post,
  HttpCode,
  Body,
  UsePipes,
  ValidationPipe,
  HttpException,
  BadRequestException
} from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto:AuthDto) {
      const oldUser = await this.authService.findUser(dto.login)
    if (oldUser){
      throw new BadRequestException('register error')
    }
    return this.authService.createUser(dto)
  }
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() {login, password}:AuthDto) {
     const user = await this.authService.validateUser(login, password)
    return this.authService.login(user.email)
  }



}
