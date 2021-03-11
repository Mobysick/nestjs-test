import { IsEnum, IsNumberString, IsOptional, IsString } from "class-validator";
import { SortDestination } from "../../core/dto/sort.dest";
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
        message: `sortBy must be one of: [${Object.keys(PostSortOption).join(
            ", ",
        )}]`,
    })
    sortBy: PostSortOption;

    @IsOptional()
    @IsEnum(SortDestination, {
        message: `sortDest must be one of: [${Object.keys(SortDestination).join(
            ", ",
        )}]`,
    })
    sortDest: SortDestination;
}
