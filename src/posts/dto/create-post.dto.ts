import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  content?: string;

  @IsEmail()
  @IsNotEmpty()
  authorEmail: string;
}
