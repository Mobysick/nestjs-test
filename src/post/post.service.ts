import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostCreateDto } from "./dto/post.create.dto";
import { PostListDto } from "./dto/post.list.dto";
import { PostUpdateDto } from "./dto/post.update.dto";
import { Post } from "./post.entity";
import { PostRepository } from "./post.repository";
import { PostListResponse } from "./types/post.list.response";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostRepository)
        private postRepository: PostRepository,
    ) {}

    async list(dto: PostListDto): Promise<PostListResponse> {
        const [data, total] = await this.postRepository.list(dto);
        return { data, total };
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
