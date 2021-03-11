import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { classToClass } from "class-transformer";
import { AdminGuard } from "src/auth/guards/admin.guard";
import { PostCreateDto } from "./dto/post.create.dto";
import { PostListDto } from "./dto/post.list.dto";
import { PostUpdateDto } from "./dto/post.update.dto";
import { PostService } from "./post.service";
import { PostDetailResponse } from "./types/post.detail.response";
import { PostListResponse } from "./types/post.list.response";

@Controller("admin/posts")
@UseGuards(AuthGuard(), AdminGuard)
export class PostAdminController {
    constructor(private postService: PostService) {}

    @Get()
    async list(@Query() dto: PostListDto): Promise<PostListResponse> {
        console.log("dto", dto);
        const { data, total } = await this.postService.list(dto);
        return { total, data: classToClass(data, { groups: ["admin"] }) };
    }

    @Post()
    async create(@Body() dto: PostCreateDto): Promise<PostDetailResponse> {
        const data = await this.postService.create(dto);
        return { data: classToClass(data, { groups: ["admin", "detail"] }) };
    }

    @Get(":id")
    async get(@Param("id") id: string): Promise<PostDetailResponse> {
        const data = await this.postService.get(id);
        return { data: classToClass(data, { groups: ["admin", "detail"] }) };
    }

    @Put(":id")
    async update(
        @Param("id") id: string,
        @Body() dto: PostUpdateDto,
    ): Promise<PostDetailResponse> {
        const data = await this.postService.update(id, dto);
        return { data: classToClass(data, { groups: ["admin", "detail"] }) };
    }

    @Delete(":id")
    async delete(@Param("id") id: string): Promise<PostDetailResponse> {
        const data = await this.postService.delete(id);
        return { data: classToClass(data, { groups: ["admin", "detail"] }) };
    }
}
