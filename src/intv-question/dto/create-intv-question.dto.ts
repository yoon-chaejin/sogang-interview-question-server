import { IsString } from "class-validator";

export class CreateIntvQuestionDto {
    @IsString()
    readonly content: string;
}