import { IsNumber, IsString } from "class-validator";

export class CreateIntvAnswerDto {
    @IsNumber()
    userId: number;
    
    @IsNumber()
    intvQuestionId: number;
    
    @IsString()
    content: string; 
}