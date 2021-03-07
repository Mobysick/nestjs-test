import { BaseEntity, PrimaryGeneratedColumn } from "typeorm";

export class BasicEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
}
