import { IsNumber, IsString } from "class-validator";

export class CreateIntvAnswerDto {
    @IsNumber()
    userId: number;
    
    @IsNumber()
    questionId: number;
    
    @IsString()
    content: string; 
}