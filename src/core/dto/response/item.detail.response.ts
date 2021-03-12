export class ItemDetailResponse<T> {
    data: T;

    constructor(params: { data: T }) {
        this.data = params.data;
    }
}
