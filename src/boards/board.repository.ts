import { Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { Board } from "./board.entity";

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(@InjectEntityManager() private entityManager: EntityManager) {
        super(Board, entityManager);
    }

    async getBoardById(id: number) {
        return await this.findOne({ where: { id } });
    }
}

