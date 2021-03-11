import { BaseEntity, PrimaryGeneratedColumn } from "typeorm";

export abstract class BasicEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
}
