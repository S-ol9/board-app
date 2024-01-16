// export interface Board {
//     id: string;
//     title: string;
//     description: string;
//     status: BoardStatus;
// } DB를 사용하게 되면 필요 없음
// board.model.ts 이름 변경

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}