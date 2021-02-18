//import express from "express";
export {};
declare global {
  interface ParsedToken {
    iss: string;
    sub: string;
    aud: string | string[];
    iat: number;
    exp: number;
    azp: string;
    scope: string;
  }

  namespace express {
    interface Request {
      user?: ParsedToken;
    }
  }
}

//export interface AuthRequest extends express.Request {
//user?: string;
//}
