import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MaxLength } from "class-validator";
import { randomUUID } from "crypto";
import { format } from "date-fns";

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 6 })
  @MaxLength(20)
  password: string;

  @IsString()
  @IsNotEmpty()
  avatar: string;

  @IsString()
  @IsOptional()
  id: string = randomUUID();

  @IsString()
  @IsOptional()
  createdAt: string = format(Date.now(), 'dd/MM/yyyy HH:mm');
}
