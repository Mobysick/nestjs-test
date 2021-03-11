import { Post } from "../post.entity";

export class PostDetailResponse {
    data: Post;

    constructor(params: { data: Post }) {
        this.data = params.data;
    }
}
