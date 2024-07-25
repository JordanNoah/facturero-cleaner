import { Hono } from "hono";
import configuration from "../domain/configuration";
import { serve } from "@hono/node-server";
import { Routes } from "./routes";
import { DbSequelize } from "../infrastructure/database";

export class Server {
    public readonly app: Hono
    private readonly port: number

    constructor() {
        this.app = new Hono()
        this.port = configuration.PORT
    }

    public start() {
        try {
            DbSequelize().then(() => {
                this.app.route('/api', new Routes().routes)
                const server = serve({
                    fetch: this.app.fetch,
                    port: this.port
                },(info) => {
                    console.log(`Server running on port ${info.port}`);
                })
            })
        } catch (error) {
            console.error(`Error starting server: ${error}`)
        }
    }
}