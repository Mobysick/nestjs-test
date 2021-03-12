export class PaginatedListResponse<T> {
    total: number;
    data: T[];

    constructor(params: { data: T[]; total: number }) {
        this.data = params.data;
        this.total = params.total;
    }
}
