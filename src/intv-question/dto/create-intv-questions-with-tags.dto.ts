import { IsString, ValidateNested } from "class-validator";

export class CreateIntvQuestionsWithTagsDto {
    @ValidateNested({ each: true })
    readonly newItems: NewItem[];
}

export class NewItem {
    @IsString()
    readonly category: string;

    @IsString({ each: true })
    readonly questions: string[];
}