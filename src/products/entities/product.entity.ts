import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { default: 0.0 })
  price: number;

  @Column('text', { default: 'no-image.png' })
  image: string;

  @Column({
    type: 'simple-json',
    default: {},
    comment: "a key-value pair that represents the product's specs",
  })
  specs: Record<string, string>;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
