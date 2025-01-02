import { IsDefined, IsNotEmpty } from "class-validator";

export class PatchUserRequest {
    @IsNotEmpty({ message: "update field must be provided" })
    @IsDefined({ message: "update field must be provided" })
    field: string;
    @IsNotEmpty({ message: "update value must be provided" })
    @IsDefined({ message: "update value must be provided" })
    value: object;

}