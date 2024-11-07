import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'Name of the user', example: 'Paul Debril' })
  name: string;

  @ApiProperty({ description: 'Address of the user', example: '123 rue calais' })
  address: string;

  @ApiProperty({ description: 'Phone number of the user', example: '0606060606' })
  phone: string;
}