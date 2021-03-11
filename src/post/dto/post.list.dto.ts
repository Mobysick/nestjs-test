import { IsEnum, IsNumberString, IsOptional, IsString } from "class-validator";
import { SortDestination } from "../../core/dto/sort.dest";
import { convertEnumErrorMessage } from "../../core/utils/convert-enum-error-message";
import { PostSortOption } from "../types/post.sort.options";

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

    @IsOptional()
    @IsEnum(PostSortOption, {
        message: convertEnumErrorMessage("sortBy", PostSortOption),
    })
    sortBy: PostSortOption;

    @IsOptional()
    @IsEnum(SortDestination, {
        message: convertEnumErrorMessage("sortDest", SortDestination),
    })
    sortDest: SortDestination;
}
