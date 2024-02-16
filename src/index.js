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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CommandHandler_1 = require("./CommandHandler");
const CommandRegisterer_1 = __importDefault(require("./CommandRegisterer"));
const DataManager_1 = __importDefault(require("./DataManager"));
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.IntentsBitField.Flags.Guilds,
        discord_js_1.IntentsBitField.Flags.GuildMembers,
        discord_js_1.IntentsBitField.Flags.GuildMessages,
        discord_js_1.IntentsBitField.Flags.MessageContent,
    ],
});
const Data = new DataManager_1.default();
// Starts the Bot
function StartBot() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Data.LoadData();
        yield client.login(Data.DISCORD_BOT_TOKEN);
        Data.SetClientID(client.user.id);
    });
}
StartBot();
client.on("ready", (c) => {
    console.log(`Bot is ready ${c.user.tag}`);
    // console.log(c.guilds.fetch().then((guilds) => console.log(guilds)));  //Gets Guild ID
    let registerer = new CommandRegisterer_1.default();
    registerer.RegisterAllCommands();
});
client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isChatInputCommand())
        return;
    // let dataMan = new DataManager(interaction.guild.id); // Commented out as it seems not used
    console.log(interaction.commandName);
    yield (0, CommandHandler_1.HandleCommand)(interaction, client);
}));
