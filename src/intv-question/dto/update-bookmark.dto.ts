import { IsBoolean, IsNumber } from "class-validator";

export class UpdateBookmarkDto {
    @IsNumber()
    intvQuestionId: number;

    @IsNumber()
    userId: number;
}