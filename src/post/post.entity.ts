import { Entity } from "typeorm";
import { CrudEntity } from "../core/entity/crud.entity";

@Entity()
export class Post extends CrudEntity {
    getSingleItemCacheKey(id?: string): string {
        return `post:${id || this.id}`;
    }

    getKeysToRemove(): string[] {
        return [this.getSingleItemCacheKey()];
    }
}
