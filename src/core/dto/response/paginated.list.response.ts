export class PaginatedListResponse<T> {
    total: number;
    data: T[];

    constructor(params: { total: number; data: T[] }) {
        this.total = params.total;
        this.data = params.data;
    }
}
