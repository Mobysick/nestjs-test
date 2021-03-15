import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumberString, IsOptional, IsString } from "class-validator";
import { SortDestination } from "../../../core/dto/request/sort.dest";
import { convertEnumErrorMessage } from "../../../core/utils/convert-enum-error-message";
import { PostSortOption } from "../../../post/types/post.sort.options";

export class PostListDto {
    @IsOptional()
    @IsNumberString()
    @ApiProperty({ required: false })
    from: number;

    @IsOptional()
    @IsNumberString()
    @ApiProperty({ required: false })
    limit: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    keyword: string;

    @IsOptional()
    @ApiProperty({ required: false, enum: PostSortOption })
    @IsEnum(PostSortOption, {
        message: convertEnumErrorMessage("sortBy", PostSortOption),
    })
    sortBy: PostSortOption;

    @IsOptional()
    @ApiProperty({ required: false, enum: SortDestination })
    @IsEnum(SortDestination, {
        message: convertEnumErrorMessage("sortDest", SortDestination),
    })
    sortDest: SortDestination;
}
