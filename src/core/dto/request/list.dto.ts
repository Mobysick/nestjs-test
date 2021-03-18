import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumberString, IsOptional } from "class-validator";
import { convertEnumErrorMessage } from "src/core/utils/convert-enum-error-message";
import { SortDestination } from "./sort.dest";

export class ListDto {
    @IsOptional()
    @IsNumberString()
    @ApiProperty({ required: false })
    from: number;

    @IsOptional()
    @IsNumberString()
    @ApiProperty({ required: false })
    limit: number;

    @IsOptional()
    @ApiProperty({ required: false, enum: SortDestination })
    @IsEnum(SortDestination, {
        message: convertEnumErrorMessage("sortDest", SortDestination),
    })
    sortDest: SortDestination;
}
