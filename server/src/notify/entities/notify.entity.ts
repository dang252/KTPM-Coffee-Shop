import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export class Notify { }

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
