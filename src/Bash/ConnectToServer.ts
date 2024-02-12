import { Client } from "ssh2";
import * as dotenv from "dotenv";
dotenv.config();

// Define an interface for the connection options, if necessary. This is optional
// and depends on how strictly you want to type your environment variables.
interface ConnectOptions {
    host: string;
    port: number;
    username: string;
    password: string;
}

function ConnectToServer(): Promise<Client> {
    return new Promise((resolve, reject) => {
        const conn = new Client();
        conn.on('ready', () => {
            console.log('SSH Connection ready');
            resolve(conn); // Resolve with the connection instance
        }).on('error', (err) => {
            console.error('SSH Connection error:', err);
            reject(err);
        }).connect({
            host: process.env.SERVER_IP!,
            port: parseInt(process.env.SERVER_PORT!),
            username: process.env.SERVER_USER!,
            password: process.env.SERVER_PASSWORD!
        });
    });
}

export default ConnectToServer;
