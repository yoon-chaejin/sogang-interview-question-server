import { IsString } from "class-validator";

export class CreateIntvQuestionDto {
    @IsString({ each: true })
    readonly content: string[];
}