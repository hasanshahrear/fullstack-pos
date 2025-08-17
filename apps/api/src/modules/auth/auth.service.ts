import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { HttpResponseException } from 'src/utils/exceptions';
import { HttpResponseService } from '../http-response/http-response.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private httpResponseService: HttpResponseService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Record<string, unknown> | null> {
    try {
      const user = await this.usersService.findByEmail(email);

      if (user && (await compare(password, user.password))) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (errors) {
      throw new HttpResponseException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        errors,
      });
    }
  }

  login(user: Record<string, unknown>) {
    const payload = { email: user.email, sub: user.id, role: user.role };

    return this.httpResponseService.generate(
      HttpStatus.OK,
      {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      'Login successful',
    );
  }
}
