import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Products {
    @PrimaryColumn()
    productId: number;

    @Column()
    productName: string;

    @Column()
    productDescription: string;

    @Column()
    productPrice: number;

    @Column('integer', { array: true, default: [] })
    upsize: number[];

    @Column('varchar', { array: true, default: [] })
    categories: string[];

}

@Entity()
export class Topping {
    @PrimaryColumn()
    toppingId: number;

    @Column()
    toppingName: string;

    @Column()
    toppingPrice: number;

}

@Entity()
export class ToppingForProduct {
    @PrimaryColumn()
    productId: number;

    @Column('int', { array: true })
    toppingIds: number[];
}

@Entity()
export class ProductImages {
    @PrimaryGeneratedColumn()
    imageId: number;

    @Column()
    productId: number;

    @Column()
    url: string;
}

@Entity()
export class FollowerList {
    @PrimaryColumn()
    productId: number;

    @Column('integer', { array: true, default: [] })
    userIds: number[];
}