import { IsNumberString, IsOptional, IsString } from "class-validator";

export class PostListDto {
    @IsOptional()
    @IsNumberString()
    from: number;

    @IsOptional()
    @IsNumberString()
    limit: number;

    @IsOptional()
    @IsString()
    keyword: string;
}
