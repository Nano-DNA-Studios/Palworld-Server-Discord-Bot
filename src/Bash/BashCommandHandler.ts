import BashScriptRunner from './BashScriptRunner';
import DataManager = require('../DataManager');
import { CacheType, ChatInputCommandInteraction, InteractionResponse, TextChannel, Client } from 'discord.js';
import CommandFactory from '../CommandFactory';
import BashScript = require('./BashScript');
import IBashCommand = require('./IBashCommand');

async function HandleBashCommand(dataManager: DataManager, interaction: ChatInputCommandInteraction<CacheType>, client: Client): Promise<void> {
    try {

        const Factory = new CommandFactory<IBashCommand>(interaction.commandName, dataManager);
        const Bash = Factory.CreateCommand(BashScript);

        let bashInstances: BashScript[] = [];

        Bash.SubCommands.forEach((subCommand) => {

            let commandName = '';
            if (subCommand === "custom") {
                commandName = Bash.CommandName;
            } else {
                commandName = subCommand;
            }

            const factory = new CommandFactory<IBashCommand>(commandName, dataManager);
            const bashInstance = factory.CreateCommand(BashScript);

            bashInstances.push(bashInstance);

        });

        let ResponseMessage = `Running ${interaction.commandName} :arrows_clockwise: \n`;

        const Response = await interaction.reply({ content: ResponseMessage, ephemeral: true }) as InteractionResponse;
        const logChannel = client.channels.cache.get(`${process.env.LOG_CHANNEL_ID}`) as TextChannel;

        for (const bashInstance of bashInstances) {
            logChannel.send(bashInstance.LogMessage);
            ResponseMessage += `${bashInstance.LogMessage} \n`;

            try {
                let BashResult = await new BashScriptRunner(bashInstance).RunBashScript();

                if (BashResult) {
                    //Successfully Ran
                    logChannel.send(bashInstance.SuccessMessage);
                    ResponseMessage += `${bashInstance.SuccessMessage} \n`;
                    Response.edit({ content: ResponseMessage });
                } else {
                    //Failure Occurred
                    logChannel.send(bashInstance.ErrorMessage);
                    ResponseMessage += `${bashInstance.ErrorMessage} \n`;

                    Response.edit({ content: ResponseMessage });
                }
            } catch (error) {
                logChannel.send(`${Bash.ErrorMessage} \n ${error}`);
                console.log(error);
            }
        }
    } catch (error) {
        console.log(`Error Occurred : ${error}`);
    }
}

export { HandleBashCommand };