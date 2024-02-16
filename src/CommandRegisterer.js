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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const FileSearch_1 = require("./FileSearch");
/**
 * Registers the commands to the Discord Server
 */
class CommandRegisterer {
    /**
     * Initializes the Command Registerer
     */
    constructor() {
        this.rest = new discord_js_1.REST({ version: "10" }).setToken(`${process.env.DISCORD_BOT_TOKEN}`);
    }
    /**
     * Registers all the commands to the Discord Server
     */
    RegisterAllCommands() {
        this.RegisterBashCommands();
    }
    /**
     * Registers the Bash Commands to the Discord Server
     */
    RegisterBashCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            const Commands = (0, FileSearch_1.GetBashCommands)();
            const CommandArray = Commands.map(element => ({
                name: element.CommandName,
                description: element.CommandDescription,
                options: element.Options.map((option) => ({
                    type: option.type,
                    name: option.name,
                    description: option.description,
                    required: option.required || false,
                }))
            }));
            this.RegisterCommands(CommandArray);
        });
    }
    /**
     * Registers the commands to the Discord Server
     * @param Commands The commands to register
     */
    RegisterCommands(Commands) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Registering Slash Commands');
                yield this.rest.put(discord_js_1.Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: Commands });
                console.log('Slash Commands Registered');
            }
            catch (error) {
                console.log(`Error Occurred: ${error}`);
            }
        });
    }
}
exports.default = CommandRegisterer;
