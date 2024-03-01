"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BotDataManager_1 = __importDefault(require("dna-discord-framework/src/Bot/BotDataManager"));
/**
 * Class Handling Data Management
 */
class PalworldBotDataManager extends BotDataManager_1.default {
    /**
     * Initializes the Data Manager
     * @param botDirectory The Directory that the Bot is located in
     */
    constructor() {
        super();
        /**
         * Name of the Process that Handles the Palworld Server
         */
        this.SERVER_PROCESS_NAME = "";
        /**
         * Name of the Script that Starts the Palworld Server
         */
        this.SERVER_START_SCRIPT = "";
        /**
         * If the Bot is running locally on the same computer as the Palworld Server hosted or will SSH to communicate
         */
        this.RUN_LOCALLY = true;
        /**
         * IP of the Server to SSH into
         */
        this.SERVER_IP = "";
        /**
         * User of the Server to SSH into
         */
        this.SERVER_USER = "";
        /**
         * Port of the Server to SSH into
         */
        this.SERVER_PORT = "";
        /**
         * Password of the Server to SSH into
         */
        this.SERVER_PASSWORD = "";
        /**
         * Directory the Palworld Server is installed in
         */
        this.STEAM_INSTALL_DIR = "";
        /**
         * Directory the Account Information is stored in
         */
        this.ACCOUNT_PATH = "";
        this.SERVER_PROCESS_NAME = "PalServer-Linux-Test";
        this.SERVER_START_SCRIPT = "PalServer.sh";
    }
    /**
     * Sets the SSH Server Information to login to the Server
     * @param serverIP IP of the Server
     * @param serverUser User on the Server
     * @param serverPort Port of the Server
     * @param serverPassword Password of the Server
     */
    SetSSHSettings(serverIP, serverUser, serverPort, serverPassword) {
        this.SERVER_IP = serverIP;
        this.SERVER_USER = serverUser;
        this.SERVER_PORT = serverPort;
        this.SERVER_PASSWORD = serverPassword;
        this.SaveData();
    }
    /**
     * Sets the Run Locally Boolean
     * @param runLocally Boolean determining if the server is running locally or not. If true, the server is running locally. If false, the server is running remotely and needs to be SSH'd into.
     */
    SetRunLocally(runLocally) {
        this.RUN_LOCALLY = runLocally;
        this.SaveData();
    }
    /**
     * Sets the Steam Install Directory
     * @param steamInstallDir Directory the Palworld Server is installed in
     */
    SetSteamInstallDir(accountPath, steamInstallDir) {
        this.STEAM_INSTALL_DIR = steamInstallDir;
        this.ACCOUNT_PATH = accountPath;
        this.SaveData();
    }
}
exports.default = PalworldBotDataManager;
