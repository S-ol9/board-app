import { IsNotEmpty } from "class-validator";

// 클래스는 인터페이스와 달리 런타임에서 작동하기 때문에 파이프 같은 기능을 이용할 때 유용.
export class CreateBoardDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
} // 게시물 생성을 위한 dto