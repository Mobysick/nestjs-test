import { Expose } from "class-transformer";
import { Column } from "typeorm";
import { BasicEntity } from "./basic.entity";

export abstract class CrudEntity extends BasicEntity {
    @Column()
    title: string;

    @Column()
    @Expose({ groups: ["detail"] })
    description: string;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    @Expose({ groups: ["admin"] })
    createdAt: Date;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    @Expose({ groups: ["admin"] })
    updatedAt: Date;

    @Column({ nullable: true })
    @Expose({ groups: ["admin"] })
    deletedAt: Date;

    @Expose()
    softDelete() {
        this.deletedAt = new Date();
    }
}
