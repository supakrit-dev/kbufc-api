import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import cors from 'cors';
import express, { Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import config from "./config";
import db from "./config/db";
import v1 from "./routes/v1";


export const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors()); // Enable CORS for all origins (for development purposes, not recommended for production)

  const sessionSecret = config.appSecretKey || 'your_fallback_secret_if_not_set';

  app.use(
    session({
      secret: sessionSecret,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
        httpOnly: true,
        secure: false,
        sameSite: 'lax',

      },
      store: new PrismaSessionStore(db as any, {
        checkPeriod: 2 * 60 * 1000, // Check and delete expired sessions every 2 minutes
        dbRecordIdIsSessionId: true,
        sessionModelName: 'Session',

      }),
    }))

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/v1', v1);

  app.get('/health', (req: Request, res: Response) => {
    res.json({ok: true, environmemt: config.logLevel});
  })

  return app;
}