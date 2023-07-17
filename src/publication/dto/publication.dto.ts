import { IsBoolean, IsISO8601, IsNotEmpty, IsString } from "class-validator";

export class PublicationDTO {
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsISO8601()
  dateToPublish: string;

  @IsBoolean()
  published: boolean;

  @IsString()
  @IsNotEmpty()
  socialMedia: string
}
