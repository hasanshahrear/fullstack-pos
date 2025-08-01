import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto, CreateOrderItemDto } from './create-order.dto';

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
