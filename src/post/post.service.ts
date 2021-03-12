import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginatedListResponse } from "../core/dto/response/paginated.list.response";
import { PostCreateDto } from "./dto/request/post.create.request.dto";
import { PostListDto } from "./dto/request/post.list.request.dto";
import { PostUpdateDto } from "./dto/request/post.update.request.dto";
import { Post } from "./post.entity";
import { PostRepository } from "./post.repository";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostRepository)
        private postRepository: PostRepository,
    ) {}

    async list(dto: PostListDto): Promise<PaginatedListResponse<Post>> {
        const [data, total] = await this.postRepository.list(dto);
        return { total, data };
    }

    async create(dto: PostCreateDto): Promise<Post> {
        let post = new Post();
        post.title = dto.title;
        post.description = dto.description;
        post = await post.save();
        return post;
    }

    async get(id: string): Promise<Post> {
        return this.postRepository.getValid(id);
    }

    async update(id: string, dto: PostUpdateDto): Promise<Post> {
        let post = await this.postRepository.getValid(id);
        post.title = dto.title;
        post.description = dto.description;
        post = await post.save();
        return post;
    }

    async delete(id: string): Promise<Post> {
        let post = await this.postRepository.getValid(id);
        post.softDelete();
        post = await post.save();
        return post;
    }
}
