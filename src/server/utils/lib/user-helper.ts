import { UsersModel } from "../../models/lib/Users";

export interface ILocalAccountParams {
    email: string;
    password: string;
}

export class UserHelper {
    protected user: UsersModel | undefined;

    constructor(user: UsersModel | undefined) {
        if (user) {
            this.user = user;
        } else {
            this.user = undefined;
        }
    }

    set setUser(user: UsersModel) {
        this.user = user;
    }

    get getUser() {
        return this.user;
    }

    async updateLocal(params: ILocalAccountParams) {
        if (this.user !== undefined) {
            const user = this.user;
            user.local.email = params.email;
            user.setPassword(params.password);

            try {
                await user.save();
                this.user = user;
            } catch (e) {
                console.log("ERROR user helper update local");
                console.error(e.message);
                throw new Error(e.message);
            }
        } else {
            throw new Error("User undefined");
        }
    }
}