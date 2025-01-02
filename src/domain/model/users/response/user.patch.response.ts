import { Expose } from "class-transformer";
import { AccessType } from "../../enum/access-type.enum";
import { AutoMap } from "@automapper/classes";

export class PatchUserResponse {
    @AutoMap()
    email: string;

    @AutoMap()
    country: string;

    @AutoMap()
    @Expose({ name: "access_type" })
    accessType: AccessType;

    @AutoMap()
    @Expose({ name: "full_name" })
    fullName: string | undefined;

    @AutoMap()
    @Expose({ name: "employer_id" })
    employerId: string | undefined;

    @AutoMap()
    @Expose({ name: "birth_date" })
    birthDate: Date | undefined;

    @AutoMap()
    salary: number | undefined
}