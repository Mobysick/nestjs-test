import { FindConditions, Repository, SelectQueryBuilder } from "typeorm";
import { CacheDuration } from "../config/config";
import { ApiErrorMessage } from "../error/api-error-message";
import { NotFoundError } from "../error/exceptions/not-found.error";

export abstract class CrudRepository<T, L> extends Repository<T> {
    protected key: string;
    public adminRules: FindConditions<T>;
    public singleItemCacheKey: string;
    protected notFoundMessage: ApiErrorMessage;

    constructor(params: {
        key: string;
        adminRules: FindConditions<T>;
        singleItemCacheKey: string;
        notFoundMessage: ApiErrorMessage;
    }) {
        super();
        this.key = params.key;
        this.adminRules = params.adminRules;
        this.singleItemCacheKey = params.singleItemCacheKey;
        this.notFoundMessage = params.notFoundMessage;
    }

    protected abstract createValidQueryBuilder(): SelectQueryBuilder<T>;

    protected abstract getListQuery(dto: L): SelectQueryBuilder<T>;

    async getValid(id: string): Promise<T> {
        const item = await this.findOne(id, {
            where: { ...this.adminRules },
            cache: {
                id: this.singleItemCacheKey,
                milliseconds: CacheDuration.LONG,
            },
        });
        if (!item) {
            throw new NotFoundError(this.notFoundMessage);
        }
        return item;
    }

    async list(dto: L): Promise<[T[], number]> {
        const query = this.getListQuery(dto);
        return query.getManyAndCount();
    }
}
