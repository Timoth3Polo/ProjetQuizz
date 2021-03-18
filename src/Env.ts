import "dotenv/config"

export class Env {
    static readonly JWT_SECRET: string = process.env.JWT_SECRET || ""
};