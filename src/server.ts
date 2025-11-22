import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import cors from 'cors';
import 'dotenv/config';
import express, { Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import db from "./config/db";
import v1 from "./routes/v1";


export const createServer = () => {
  const app = express();

  app.get('/health', (req: Request, res: Response) => {
    res.sendStatus(200);
  })
  
  app.use(cors({ origin: process.env.FRONTEND_ADMIN_URL, credentials: true }));
  app.use(express.json());

  const sessionSecret = process.env.appSecretKey || 'SECRET';

  app.use(
    session({
      secret: sessionSecret,
      saveUninitialized: false,
      resave: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
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



  return app;
}