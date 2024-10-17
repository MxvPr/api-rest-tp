import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {Order} from "./entities/order.entity";

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


  @Post()
  @ApiResponse({status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    @ApiResponse({status: 400, description: 'Bad Request.'})
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiResponse({status: 200, description: 'The records has been successfully returned.', type: [Order]})
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiResponse({status: 200, description: 'The record has been successfully returned.', type: Order})
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
    @ApiResponse({status: 200, description: 'The record has been successfully updated.', type: Order})
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
    @ApiResponse({status: 200, description: 'The record has been successfully deleted.'})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    @ApiResponse({status: 404, description: 'Not Found.'})
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
