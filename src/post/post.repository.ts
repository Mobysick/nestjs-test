import {
    Brackets,
    EntityRepository,
    IsNull,
    SelectQueryBuilder,
} from "typeorm";
import { CrudRepository } from "../core/crud/crud.repository";
import { SortDestination } from "../core/dto/request/sort.dest";
import { ApiErrorMessage } from "../core/error/api-error-message";
import { PostListDto } from "./dto/request/post.list.request.dto";
import { Post } from "./post.entity";
import { PostSortOption } from "./types/post.sort.options";

@EntityRepository(Post)
export class PostRepository extends CrudRepository<Post, PostListDto> {
    constructor() {
        super({
            key: "post",
            adminRules: { deletedAt: IsNull() },
            singleItemCacheKey: new Post().getSingleItemCacheKey(),
            notFoundMessage: ApiErrorMessage.POST_NOT_FOUND,
        });
    }

    protected createValidQueryBuilder(): SelectQueryBuilder<Post> {
        return this.createQueryBuilder(this.key).andWhere(
            `${this.key}.deletedAt IS NULL`,
        );
    }

    protected getListQuery(dto: PostListDto): SelectQueryBuilder<Post> {
        const { from, limit, keyword } = dto;

        const query = this.createValidQueryBuilder();

        if (from) {
            query.skip(from);
        }
        if (limit) {
            query.take(limit);
        }
        if (keyword) {
            query.andWhere(
                new Brackets((qb) => {
                    qb.where(`${this.key}.title like :likeQuery`, {
                        likeQuery: `%${keyword}%`,
                    });
                    qb.orWhere(`${this.key}.description like :likeQuery`, {
                        likeQuery: `%${keyword}%`,
                    });
                }),
            );
        }

        const sortDest = dto.sortDest || SortDestination.ASC;
        switch (dto.sortBy) {
            case PostSortOption.TITLE: {
                query.orderBy(`${this.key}.title`, sortDest);
                break;
            }
            case PostSortOption.CREATED_AT: {
                query.orderBy(`${this.key}.createdAt`, sortDest);
                break;
            }
            case PostSortOption.UPDATED_AT: {
                query.orderBy(`${this.key}.updatedAt`, sortDest);
                break;
            }
            default: {
                query.orderBy(`${this.key}.title`, sortDest);
            }
        }

        return query;
    }
}
