import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './create-menu.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  @ApiPropertyOptional({ description: 'The name of the menu item (optional)' })
  Name?: string;

  @ApiPropertyOptional({ description: 'A short description of the menu item (optional)' })
  Description?: string;

  @ApiPropertyOptional({ description: 'The price of the menu item (optional)' })
  price?: string;

  @ApiPropertyOptional({ description: 'The associated restaurant of the menu (optional)' })
  Restaurant?: string;
}
