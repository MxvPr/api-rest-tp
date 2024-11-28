import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'float' })
  price: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.items, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;
}
