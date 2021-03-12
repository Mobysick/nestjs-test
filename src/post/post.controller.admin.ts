import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    SerializeOptions,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PaginatedListResponse } from "src/core/dto/response/paginated.list.response";
import { AdminGuard } from "../auth/guards/admin.guard";
import { ItemDetailResponse } from "../core/dto/response/item.detail.response";
import { PostCreateDto } from "./dto/request/post.create.request.dto";
import { PostListDto } from "./dto/request/post.list.request.dto";
import { PostUpdateDto } from "./dto/request/post.update.request.dto";
import { Post as PostEntity } from "./post.entity";
import { PostService } from "./post.service";

@Controller("admin/posts")
@UseGuards(AuthGuard(), AdminGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class PostAdminController {
    constructor(private postService: PostService) {}

    @Get()
    @SerializeOptions({ groups: ["admin"] })
    async list(
        @Query() dto: PostListDto,
    ): Promise<PaginatedListResponse<PostEntity>> {
        const { total, data } = await this.postService.list(dto);
        return new PaginatedListResponse({ total, data });
    }

    @Post()
    @SerializeOptions({ groups: ["admin", "detail"] })
    async create(
        @Body() dto: PostCreateDto,
    ): Promise<ItemDetailResponse<PostEntity>> {
        const data = await this.postService.create(dto);
        return new ItemDetailResponse({ data });
    }

    @Get(":id")
    @SerializeOptions({ groups: ["admin", "detail"] })
    async get(
        @Param("id") id: string,
    ): Promise<ItemDetailResponse<PostEntity>> {
        const data = await this.postService.get(id);
        return new ItemDetailResponse({ data });
    }

    @Put(":id")
    @SerializeOptions({ groups: ["admin", "detail"] })
    async update(
        @Param("id") id: string,
        @Body() dto: PostUpdateDto,
    ): Promise<ItemDetailResponse<PostEntity>> {
        const data = await this.postService.update(id, dto);
        return new ItemDetailResponse({ data });
    }

    @Delete(":id")
    @SerializeOptions({ groups: ["admin", "detail"] })
    async delete(
        @Param("id") id: string,
    ): Promise<ItemDetailResponse<PostEntity>> {
        const data = await this.postService.delete(id);
        return new ItemDetailResponse({ data });
    }
}
