import { Entity } from "typeorm";
import { CrudEntity } from "../core/crud.entity";

@Entity()
export class Post extends CrudEntity {}
