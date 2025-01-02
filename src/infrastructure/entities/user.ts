import { AutoMap } from "@automapper/classes";
import { AccessType } from "../../domain/model/enum/access-type.enum";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("users")
export class User {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column({ unique: true, nullable: false })
    email: string;

    @AutoMap()
    @Column({ nullable: false,length:8000 })
    password: string;

    @AutoMap()
    @Column({ nullable: false })
    country: string;

    @AutoMap()
    @Column({ type: "enum", enum: AccessType, name: "access_type", nullable: false })
    accessType: AccessType;

    @AutoMap()
    @Column({ name: "full_name", nullable: true })
    fullName: string | undefined;

    @AutoMap()
    @Column({ name: "employer_id", nullable: true })
    employerId: string | undefined;

    @AutoMap()
    @Column({ type: "date", nullable: true, name: "birth_date" })
    birthDate: Date | undefined;

    @AutoMap()
    @Column({ type: "decimal", nullable: true })
    salary: number;

}