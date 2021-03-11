import { Post } from "../post.entity";

export class PostListResponse {
    data: Post[];
    total: number;

    constructor(params: { data: Post[]; total: number }) {
        this.data = params.data;
        this.total = params.total;
    }
}
