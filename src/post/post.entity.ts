import { Entity } from "typeorm";
import { CrudEntity } from "../core/entity/crud.entity";

@Entity()
export class Post extends CrudEntity {}
