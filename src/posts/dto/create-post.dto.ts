import { IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsEmail()
  authorEmail: string;
}
