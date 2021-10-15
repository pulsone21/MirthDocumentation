import { Request, Response } from "express";

declare module "express-session" {
    interface Session {
        userId?: string;
    }
}

export type MyContext = {
    req: Request;
    res: Response;
};
