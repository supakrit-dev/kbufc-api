import { NextFunction, Request, Response, Router } from "express";
import passport from "../../config/passport";


const router = Router();

router.post(
    "/login",
    passport.authenticate("local"),
    (req: Request, res: Response) => {
        return res.sendStatus(200);
    }
);

router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) { return next(err); }

        req.session.destroy((err) => {
            req.user = undefined;
            res.clearCookie('connect.sid');
            if (err) return next(err);
            res.redirect('/');
        });
    });
});

router.get("/status", (req: Request, res: Response) => {
    return req.user
        ? res.send(req.user)
        : res.status(401).send({ msg: "Not Authenticated" });
});

export default router