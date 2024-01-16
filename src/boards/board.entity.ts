import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board-status.enum";

export class Board extends BaseEntity {
    @PrimaryGeneratedColumn() // 기본 키임을 알려주는 데코레이터
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;
}