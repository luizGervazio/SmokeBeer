import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateWineDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  productor: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsInt()
  @Min(1800)
  year: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  alcoholContent: number;

  @IsString()
  @IsNotEmpty()
  typeGrape: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;
}
