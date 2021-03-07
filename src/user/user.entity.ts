import { Column, Entity } from "typeorm";
import { BasicEntity } from "../core/basic.entity";
import { UserRole } from "./user-role.enum";

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
