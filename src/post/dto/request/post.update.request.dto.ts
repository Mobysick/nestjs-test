import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class PostUpdateDto {
    @MaxLength(20)
    @MinLength(2)
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @MaxLength(80)
    @MaxLength(20)
    @MinLength(2)
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;
}
