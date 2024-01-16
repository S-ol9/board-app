import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Board } from "./board.entity";

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }

    async getBoardById(id: number) {
        return await this.findOneBy({id: id});
    }
}