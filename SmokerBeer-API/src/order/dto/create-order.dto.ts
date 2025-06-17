import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  username: string;

  @IsArray()
  items: { wineId: string; quantity: number; price: number }[];

  @IsNumber()
  totalPrice: number;

  @IsOptional()
  @IsEnum(['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED'])
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED';

  @IsOptional()
  @IsString()
  paymentMethod?: string;

}
