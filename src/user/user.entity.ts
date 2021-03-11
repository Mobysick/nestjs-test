import { Column, Entity } from "typeorm";
import { BasicEntity } from "../core/entity/basic.entity";
import { UserRole } from "./types/user-role.enum";

@Entity()
export class User extends BasicEntity {
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    salt: string;

    @Column("simple-array")
    roles: UserRole[];
}
