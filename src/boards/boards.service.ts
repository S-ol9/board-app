import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = []; // private로 선언하지 않으면 다른 컴포넌트에서 boards의 배열값을 수정할 수 있음.

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto) {
        const {title, description } = createBoardDto;
        const board: Board = { // 유효한 아이디 값을 줘야 오류 표시가 안 남.
            // npm install uuid --save 한 후 import
            id: uuid(),
            title,
            description, // 자바스크립트에서는 description: description 과 같이 이름이 똑같을 경우 그냥 하나만 써줘도 상관 없음.
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        const found = this.boards.find((board) => board.id === id);

        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    deleteBoard(id: string): void { // 리턴 값을 주지 않을 거기에 void로 명시
        const found = this.getBoardById(id)
        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
