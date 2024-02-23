import * as dotenv from "dotenv";
import { Client } from "ssh2";
import BashScript from "./BashScript";
import DataManager from "../DataManager";


class BashScriptRunner {

    private _dataManager: DataManager;
    private _scriptRanSuccessfully: boolean = true;
    public BashCommand: BashScript;

    constructor(bashCommand: BashScript, dataManager: DataManager) {
        this._dataManager = dataManager;
        this.BashCommand = bashCommand;
    }

    private DetermineError(data: any): void {
        let Fails = this.BashCommand.FailMessages;
        let dataStr = data.toString().replace(/\r?\n|\r/g, "");
        if (Fails.includes(dataStr)) {
            this._scriptRanSuccessfully = false;
        }
    }

    public async RunBashScript(): Promise<boolean> {
        this._scriptRanSuccessfully = true;

        const ServerConnection = await this.ConnectToServer();

        const Script = await this.BashCommand.GetCode();

        return new Promise<boolean>((resolve, reject) => {
            ServerConnection.exec(`${Script}`, (err, stream) => {
                if (err) throw err;

                let dataBuffer = "";

                if (this.BashCommand.HasMaxOutTimer()) {
                    console.log("Max Timeout Set");
                    setTimeout(() => {
                        console.log("Max Timeout Reached");
                        resolve(this._scriptRanSuccessfully);
                        stream.end();
                    }, this.BashCommand.MaxOutTimer);
                }

                stream
                    .on("close", (code: string, signal: string) => {
                        resolve(this._scriptRanSuccessfully);
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
                host: this._dataManager.SERVER_IP!,
                port: parseInt(this._dataManager.SERVER_PORT!),
                username: this._dataManager.SERVER_USER!,
                password: this._dataManager.SERVER_PASSWORD!
            });
        });
    }
}

export default BashScriptRunner;
