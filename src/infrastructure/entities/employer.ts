import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("employers")
export class Employer {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name:"employer_name",length:255,nullable:false})
    employerName:string;

    @Column({name:"file_url",length:1000,nullable:false})
    fileUrl:string;
}