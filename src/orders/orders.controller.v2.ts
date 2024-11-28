import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Menu } from 'src/menus/entities/menu.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { Item } from 'src/items/entities/item.entity';

@ApiTags('orders')
@Controller('v2/orders')
export class OrdersControllerV2 {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new order',
    description: 'Creates a new order with the given details.',
  })
  @ApiBody({
    type: CreateOrderDto,
    description: 'Order creation data',
    examples: {
      validOrder: {
        summary: 'A valid order',
        value: {
          items: [
            { itemsId: '123e4567-e89b-12d3-a456-426614174002', quantity: 2 },
            { itemsId: '123e4567-e89b-12d3-a456-426614174003', quantity: 1 },
          ],
          prix: 29.99,
          user: {
            userId: '123e4567-e89b-12d3-a456-426614174000',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully created.',
    type: Order,
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174004',
        userId: '123e4567-e89b-12d3-a456-426614174000',
        restaurantId: '123e4567-e89b-12d3-a456-426614174001',
        items: [
          { itemsId: '123e4567-e89b-12d3-a456-426614174002', quantity: 2 },
          { itemsId: '123e4567-e89b-12d3-a456-426614174003', quantity: 1 },
        ],
        totalPrice: 29.99,
        status: 'pending',
        createdAt: '2023-01-01T12:00:00Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data.',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'totalPrice must be a positive number',
          'items should not be empty',
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error occurred while processing the request.',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error',
      },
    },
  })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all orders',
    description: 'Retrieves all orders.',
  })
  @ApiResponse({
    status: 200,
    description: 'The orders have been successfully retrieved.',
    type: [Order],
  })
  @ApiResponse({
    status: 404,
    description: 'No orders found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'No orders found',
        error: 'Not Found',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error occurred while processing the request.',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error',
      },
    },
  })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('items')
  @ApiOperation({
    summary: 'Get all order items',
    description: 'Retrieves all items from all orders.',
  })
  @ApiResponse({
    status: 200,
    description: 'Items successfully retrieved',
    schema: {
      example: [
        { itemsId: '123e4567-e89b-12d3-a456-426614174002', quantity: 2 },
        { itemsId: '123e4567-e89b-12d3-a456-426614174003', quantity: 1 },
      ],
    },
  })
  @ApiResponse({
    status: 404,
    description: 'No items found',
  })
  findAllItems() {
    return this.ordersService.findAllItems();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific order by id',
    description: 'Retrieves an order by its unique identifier.',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully retrieved.',
    type: Order,
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Get(':id/items')
  @ApiOperation({
    summary: 'Get a specific item from an order',
    description:
      'Retrieves a specific item from an order by its unique identifier.',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The item has been successfully retrieved.',
    type: Item,
  })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  findOneItem(@Param('id') id: string) {
    return this.ordersService.findOneItem(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an order',
    description: 'Updates an existing order by its unique identifier.',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully updated.',
    type: Order,
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data.',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'totalPrice must be a positive number',
          'items should not be empty',
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error occurred while processing the request.',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error',
      },
    },
  })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an order',
    description: 'Deletes an existing order by its unique identifier.',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully deleted.',
    type: Order,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data.',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'totalPrice must be a positive number',
          'items should not be empty',
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Order not found',
        error: 'Not Found',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error occurred while processing the request.',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error',
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
