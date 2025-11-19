import passport from "passport";
import { Strategy } from "passport-local";
import { comparePassword } from "../utils/helper";
import logger from "../utils/logger";
import db from "./db";

type User = {
    id?: string
    username?: string
    password?: string
    role?: 'ADMIN' | 'USER'
    status?: 'ACTIVE' | 'INACTIVE'
}

passport.serializeUser((user: User, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const findUser = await db.user.findFirst({
            where: { id }
        });
        if (!findUser) throw new Error("User not found");
        done(null, findUser);
    } catch (error) {
        done(error, null);
    }
});

//Verify Function(Login)
export default passport.use(
    new Strategy(async (username, password, done) => {
        try {
            const findUser = await db.user.findFirst({
                where: { username }
            });
            if (!findUser) {
                throw new Error("User not found");
            }

            if (!comparePassword(password, findUser.password)) {
                throw new Error("Invalid Credentials");
            }
            done(null, findUser);
        } catch (error) {
            logger.warn(error)
            done(error, false);
        }
    })
);