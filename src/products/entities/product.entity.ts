import { Column, Entity, PrimaryColumn } from 'typeorm';

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

// @Entity()
// export class Category {
//     @PrimaryGeneratedColumn()
//     categoryId: number;

//     @Column()
//     categoryName: string;
// }

@Entity()
export class ToppingForProduct {
    @PrimaryColumn()
    productId: number;

    @Column('int', { array: true })
    toppingIds: number[];
}