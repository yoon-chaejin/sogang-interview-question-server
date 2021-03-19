import { IsString } from "class-validator";

export class CreateIntvQuestionDto {
    @IsString({ each: true })
    content: string[];
}