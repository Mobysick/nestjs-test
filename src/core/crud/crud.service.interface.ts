import { CreateItemDto } from "../dto/request/create.dto";
import { ListDto } from "../dto/request/list.dto";
import { UpdateItemDto } from "../dto/request/update.dto";
import { PaginatedListResponse } from "../dto/response/paginated.list.response";

export interface CrudService<T> {
    list(dto: ListDto): Promise<PaginatedListResponse<T>>;

    create(dto: CreateItemDto): Promise<T>;

    get(id: string): Promise<T>;

    update(id: string, dto: UpdateItemDto): Promise<T>;

    delete(id: string): Promise<T>;
}
