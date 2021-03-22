import { Token } from "../entities/token.entity";
import { User } from "../entities/user.entity";

export class UserWithTokenDto {
    readonly user: User;
    readonly token: Token;
}