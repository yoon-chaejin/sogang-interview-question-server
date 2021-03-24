import { IsNumber, IsString } from "class-validator";

export class CreateIntvAnswerDto {
    @IsNumber()
    questionId: number;
    
    @IsString()
    content: string; 
}