import { IsDefined, IsNotEmpty } from "class-validator";
import { UPDATE_FIELD_REQUIRED, UPDATE_VALUE_REQUIRED } from "src/domain/message/validation.message";

export class PatchUserRequest {
    @IsNotEmpty({ message: UPDATE_FIELD_REQUIRED })
    @IsDefined({ message: UPDATE_FIELD_REQUIRED })
    field: string;
    @IsNotEmpty({ message: UPDATE_VALUE_REQUIRED })
    @IsDefined({ message: UPDATE_VALUE_REQUIRED })
    value: object;

}