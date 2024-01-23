import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) { }
    // private boards: Board[] = []; // private로 선언하지 않으면 다른 컴포넌트에서 boards의 배열값을 수정할 수 있음.

    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    // createBoard(createBoardDto: CreateBoardDto) {
    //     const {title, description } = createBoardDto;
    //     const board: Board = { // 유효한 아이디 값을 줘야 오류 표시가 안 남.
    //         // npm install uuid --save 한 후 import
    //         id: uuid(),
    //         title,
    //         description, // 자바스크립트에서는 description: description 과 같이 이름이 똑같을 경우 그냥 하나만 써줘도 상관 없음.
    //         status: BoardStatus.PUBLIC
    //     }

    //     this.boards.push(board);
    //     return board;
    // }

    createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOneBy({ id });

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }

        return found;
    }
    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id);

    //     if(!found) {
    //         throw new NotFoundException(`Can't find Board with id ${id}`);
    //     }

    //     return found;
    // }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
        console.log('result', result);
    }
    // deleteBoard(id: string): void { // 리턴 값을 주지 않을 거기에 void로 명시
    //     const found = this.getBoardById(id)
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
