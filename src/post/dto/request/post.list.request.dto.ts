import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { ListDto } from "../../../core/dto/request/list.dto";
import { convertEnumErrorMessage } from "../../../core/utils/convert-enum-error-message";
import { PostSortOption } from "../../../post/types/post.sort.options";

export class PostListDto extends ListDto {
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
}
