import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    orderId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    userId: number;

    @Column({ default: 'CREATED' })
    orderStatus: string;

    @Column()
    totalPrice: number;

    @Column()
    shippingInfoAddress: string;

    @Column()
    shippingInfoPhone: string;

    @Column({ default: 0 })
    shippingInfoFee: number;
}

@Entity() // Specify the table name
export class OrderDetail {
    @PrimaryGeneratedColumn()
    detailId: number;

    @Column()
    orderId: number;

    @Column()
    productId: number;

    @Column({ nullable: true })
    size: string;

    @Column()
    quantity: number;

    @Column('integer', { array: true, default: [] }) // Specify that the column type is an array of integers
    toppingIds: number[];
}