import * as dotenv from "dotenv";
import { Client } from "ssh2";
dotenv.config();
import BashScript from "./BashScript";

class BashScriptRunner {
    private ScriptRanSuccessfully: boolean = true;
    public BashCommand: BashScript;

    constructor(bashCommand: BashScript) {
        this.BashCommand = bashCommand;
    }

    private DetermineError(data: any): void {
        let Fails = this.BashCommand.FailMessages;
        let dataStr = data.toString().replace(/\r?\n|\r/g, "");
        if (Fails.includes(dataStr)) {
            this.ScriptRanSuccessfully = false;
        }
    }

    public async RunBashScript(): Promise<boolean> {
        this.ScriptRanSuccessfully = true;

        const ServerConnection = await this.ConnectToServer();

        const Script = await this.BashCommand.GetCode();

        return new Promise<boolean>((resolve, reject) => {
            ServerConnection.exec(`${Script}`, (err, stream) => {
                if (err) throw err;

                let dataBuffer = "";

                if (this.BashCommand.HasMaxOutTimer()) {
                    setTimeout(() => {
                        console.log("Max Timeout Reached");
                        resolve(this.ScriptRanSuccessfully);
                        stream.end();
                    }, this.BashCommand.MaxOutTimer);
                }

                stream
                    .on("close", (code: string, signal: string) => {
                        resolve(this.ScriptRanSuccessfully);
                    })
                    .on("data", (data: string) => {
                        dataBuffer += data;
                        console.log("STDOUT: " + data);
                        this.DetermineError(data);
                    })
                    .stderr.on("data", (data) => {
                        console.error("STDERR: " + data);
                        this.DetermineError(data);
                    });
            });
        });
    }


    ConnectToServer(): Promise<Client> {
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
}

export default BashScriptRunner;
