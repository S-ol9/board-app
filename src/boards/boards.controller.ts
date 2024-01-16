import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService)  {};
    // 앞에 접근 제한자를 설정해줌으로써 인수 파라미터에서 암묵적으로 프로퍼티로 선언
    // this.boardsService.메소드() 형식으로 바로 쓸 수 있음.

    @Get('/') //핸들러 생성
    getAllBoard() {
        return this.boardsService.getAllBoards();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        // @Body('title') title: string,
        // @Body('description') description: string
        // 일일히 줄 경우 나중에 파라미터가 많아지면 감당 X
        @Body() CreateBoardDto : CreateBoardDto

    ): Board { // return은 Board 하나이기 때문에 배열 쓰면 X
        return this.boardsService.createBoard(CreateBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board {
        return this.boardsService.getBoardById(id)
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: string): void {
        this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id: string,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ) {
        return this.boardsService.updateBoardStatus(id, status)
    }
}