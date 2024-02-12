import * as dotenv from "dotenv";
import { Client } from "ssh2";
dotenv.config();
import BashScriptFactory from "./BashScriptFactory";

class BashScriptRunner {
    private ScriptRanSuccessfully: boolean = true;
    public Factory: BashScriptFactory;

    constructor(factory: BashScriptFactory) {
        this.Factory = factory;
    }

    private DetermineError(data: any, Factory: BashScriptFactory): void {
        let Fails = Factory.GetBashScript().FailMessages;
        let dataStr = data.toString().replace(/\r?\n|\r/g, "");
        if (Fails.includes(dataStr)) {
            this.ScriptRanSuccessfully = false;
        }
    }

    public async RunBashScript(): Promise<boolean> {
        this.ScriptRanSuccessfully = true;

        const ServerConnection = await this.ConnectToServer();

        const Script = await this.Factory.GetBashScript().GetCode();

        return new Promise<boolean>((resolve, reject) => {
            ServerConnection.exec(`${Script}`, (err, stream) => {
                if (err) throw err;

                let dataBuffer = "";

                if (this.Factory.HasMaxOutTimer()) {
                    setTimeout(() => {
                        console.log("Max Timeout Reached");
                        resolve(this.ScriptRanSuccessfully);
                        stream.end();
                    }, 5000);
                }

                stream
                    .on("close", (code: string, signal: string) => {
                        resolve(this.ScriptRanSuccessfully);
                    })
                    .on("data", (data: string) => {
                        dataBuffer += data;
                        console.log("STDOUT: " + data);
                        this.DetermineError(data, this.Factory);
                    })
                    .stderr.on("data", (data) => {
                        console.error("STDERR: " + data);
                        this.DetermineError(data, this.Factory);
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
