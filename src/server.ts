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
  app.use(cors({ origin: "http://localhost:3001", credentials: true}));
  app.use(express.json());

  const sessionSecret = config.appSecretKey || 'SECRET';

  app.use(
    session({
      secret: sessionSecret,
      saveUninitialized: false,
      resave: false,
      cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
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