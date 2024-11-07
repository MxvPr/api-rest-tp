import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MenuModule } from './menu/menu.module';
import { CommandeModule } from './commande/commande.module';
import { ItemsModule } from './items/items.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [UserModule, RestaurantModule, MenuModule, CommandeModule, ItemsModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
