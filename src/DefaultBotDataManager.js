"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
/**
 * The Default Bot Data Manager, implementing the bareminimum for a Bot Data Manager
 */
class DefaultBotDataManager {
    /**
     * Initializes the Data Manager
     * @param botDirectory The Directory that the Bot is located in
     */
    constructor() {
        /**
         * Discord Bot Token
         */
        this.DISCORD_BOT_TOKEN = "";
        /**
         * Discord Server ID
         */
        this.GUILD_ID = "";
        /**
         * Name of the Discord Server
         */
        this.GUILD_NAME = "";
        /**
         * Id of the Discord Bot
         */
        this.CLIENT_ID = "";
        /**
         * Channel ID of the Log Channel that the Bot will send logs to
         */
        this.LOG_CHANNEL_ID = "";
        this.DATA_SAVE_PATH = process.cwd() + '\\Resources';
        this.FILE_SAVE_PATH = this.DATA_SAVE_PATH + '\\data.json';
    }
    /**
     * Loads the Data from the File or Registers it by creating the Default Data and file
     */
    LoadData() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.FileExists()) {
                this.LoadDataFromFile();
            }
            else {
                yield this.RegisterServerController();
                this.LoadDataFromFile();
            }
        });
    }
    /**
     * Determines if the Data File Exists
     * @returns True if the file exists, False if it does not
     */
    FileExists() {
        return fs_1.default.existsSync(this.FILE_SAVE_PATH);
    }
    /**
     * Saves the Data to the File
     */
    SaveData() {
        let jsonData = this.GetJSONFormat();
        if (fs_1.default.existsSync(this.DATA_SAVE_PATH))
            fs_1.default.writeFileSync(this.FILE_SAVE_PATH, jsonData);
        else {
            throw new Error(`Data Save Path does not exist ${this.DATA_SAVE_PATH}`);
        }
    }
    /**
     * Loads the Data from the File
     */
    LoadDataFromFile() {
        let dataJSON = fs_1.default.readFileSync(this.FILE_SAVE_PATH, 'utf8');
        let data = JSON.parse(dataJSON);
        //Load all data from JSON and put it in class variables 
        this.DISCORD_BOT_TOKEN = data.DiscordBotToken;
        this.GUILD_ID = data.GuildID;
        this.GUILD_NAME = data.GuildName;
        this.CLIENT_ID = data.ClientID;
        this.LOG_CHANNEL_ID = data.LogChannelID;
    }
    /**
     * Registers the Server Controller by asking for the Bot Token
     */
    RegisterServerController() {
        return __awaiter(this, void 0, void 0, function* () {
            const setupReader = readline_1.default.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            //Setup Question format
            const prompt = (query) => new Promise((resolve) => setupReader.question(query, resolve));
            // Prompt for bot token and guild ID asynchronously
            let botToken = yield prompt('Enter the Discord Bot Token: ');
            let guildName = yield prompt('Enter the Guild Name: ');
            // Close the readline interface after collecting all necessary inputs
            setupReader.close();
            let data = {
                'DiscordBotToken': botToken,
                'GuildID': '',
                'GuildName': guildName,
                'ClientID': '',
                'ServerProcessName': "PalServer-Linux-Test",
                'ServerStartScript': "PalServer.sh",
                'LogChannelID': '',
                'RunLocally': true,
                'ServerIP': '',
                'ServerUser': '',
                'ServerPort': '',
                'ServerPassword': '',
                'SteamInstallDir': '/home/user/PalworldServer',
            };
            //Save the data to the file
            let JSONData = JSON.stringify(data, null, 4);
            fs_1.default.writeFileSync(this.FILE_SAVE_PATH, JSONData);
        });
    }
    /**
     * Gets the Data in JSON Format
     * @returns A string of the Data in JSON Format
     */
    GetJSONFormat() {
        let data = {
            'DiscordBotToken': this.DISCORD_BOT_TOKEN,
            'GuildID': this.GUILD_ID,
            'GuildName': this.GUILD_NAME,
            'ClientID': this.CLIENT_ID,
            'LogChannelID': this.LOG_CHANNEL_ID,
        };
        return JSON.stringify(data, null, 4);
    }
    /**
     * Sets the Client ID for the Bot
     * @param clientID the ID of the Bot in string format
     */
    SetClientID(clientID) {
        if (this.CLIENT_ID !== clientID) {
            this.CLIENT_ID = clientID;
            this.SaveData();
        }
    }
    /**
     * Sets the Guild ID for the Bot
     * @param guildID ID of the Guild
     */
    SetGuildID(guildID) {
        this.GUILD_ID = guildID;
        this.SaveData();
    }
    /**
     * Sets the Log Channel that the Bot will send logs to
     * @param logChannelID The ID of the Log Channel
     */
    SetLogChannelID(logChannelID) {
        this.LOG_CHANNEL_ID = logChannelID;
        this.SaveData();
    }
}
exports.default = DefaultBotDataManager;
