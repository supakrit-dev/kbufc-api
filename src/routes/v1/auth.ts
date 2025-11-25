import { Request, Response, Router } from "express";
import passport from "../../config/passport";
import logger from "../../utils/logger";


const router = Router();

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err: { message: any; }, user: Express.User, info: { message: any; }) => {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }

        if (info?.message) {
            return res.status(400).json({ success: false, message: info.message });
        }

        if (!user) {
            return res.status(401).json({ success: false, message: "Authentication failed" });
        }

        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Login failed" });
            }

            req.session.save((err) => {
                if (err) {
                    return res.status(500).json({ success: false });
                }

                return res.status(200).json({
                    success: true,
                    message: "Login Success"
                });
            });
        });

    })(req, res, next);
});


router.post("/logout", (req: Request, res: Response) => {
    req.logout((err) => {
        if (err) { return res.status(500).json({ success: false, message: err }); }
        req.session.destroy((err) => {
            req.user = undefined;
            res.clearCookie('connect.sid');
            if (err) { return res.status(500).json({ success: false, message: err }); }
            
            logger.info('Your are Logged out.')
            return res.status(200).json({
                success: true,
                message: "Your are Logged out."
            })
        });
    });
});

router.get("/status", (req: Request, res: Response) => {
    return req.user
        ? res.send(req.user)
        : res.status(401).send({ msg: "Not Authenticated" });
});

export default router