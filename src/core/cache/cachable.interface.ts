export interface CacheableInterface {
    getSingleItemCacheKey(): string;
    getKeysToRemove(): string[];
}
