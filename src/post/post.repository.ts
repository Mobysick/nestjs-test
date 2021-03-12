import {
    Brackets,
    EntityRepository,
    FindConditions,
    IsNull,
    Repository,
    SelectQueryBuilder,
} from "typeorm";
import { SortDestination } from "../core/dto/request/sort.dest";
import { ApiErrorMessage } from "../core/error/api-error-message";
import { NotFoundError } from "../core/error/exceptions/not-found.error";
import { PostListDto } from "./dto/request/post.list.request.dto";
import { Post } from "./post.entity";
import { PostSortOption } from "./types/post.sort.options";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
    public readonly key = "post";
    public readonly adminRules: FindConditions<Post> = { deletedAt: IsNull() };

    private createValidQueryBuilder(): SelectQueryBuilder<Post> {
        return this.createQueryBuilder(this.key).andWhere(
            `${this.key}.deletedAt IS NULL`,
        );
    }

    async list(dto: PostListDto): Promise<[Post[], number]> {
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

        return query.getManyAndCount();
    }

    async getValid(id: string) {
        const post = await this.findOne(id, { where: { ...this.adminRules } });
        if (!post) {
            throw new NotFoundError(ApiErrorMessage.POST_NOT_FOUND);
        }
        return post;
    }
}
