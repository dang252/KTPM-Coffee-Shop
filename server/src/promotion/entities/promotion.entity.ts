import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export class Promotion {
    @PrimaryGeneratedColumn()
    promotionId: number;

    @Column()
    promotionName: string;

    @Column()
    promotionDesc: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    discountRate: number;
}

@Entity()
export class ProductPromotion extends Promotion {
    @Column('integer', { array: true })
    productIds: number[]
}

@Entity()
export class CategoryPromotion extends Promotion {
    @Column('varchar', { array: true })
    categories: string[];
}

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    messageId: number

    @Column()
    userId: number

    @Column()
    messageInfo: string

    @Column()
    promotionId: number

    @Column()
    status: string
}