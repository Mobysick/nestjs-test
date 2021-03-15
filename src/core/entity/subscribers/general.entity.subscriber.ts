import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    RemoveEvent,
    UpdateEvent,
} from "typeorm";
import { CacheableInterface } from "../../../core/cache/cachable.interface";
import { CrudEntity } from "../crud.entity";

@EventSubscriber()
export class GeneralEntitySubscriber implements EntitySubscriberInterface {
    listenTo() {
        return CrudEntity;
    }

    isCacheable(object: any): object is CacheableInterface {
        const myInterface = object as CacheableInterface;
        return myInterface.getSingleItemCacheKey !== undefined;
    }

    private async clearCache(
        event:
            | InsertEvent<CrudEntity>
            | UpdateEvent<CrudEntity>
            | RemoveEvent<CrudEntity>,
    ) {
        if (this.isCacheable(event.entity)) {
            await event.connection.queryResultCache.remove(
                event.entity.getKeysToRemove(),
            );
        }
    }

    async afterInsert(event: InsertEvent<any>) {
        this.clearCache(event);
    }

    async afterUpdate(event: UpdateEvent<any>) {
        this.clearCache(event);
    }

    async beforeRemove(event: RemoveEvent<any>) {
        this.clearCache(event);
    }
}
