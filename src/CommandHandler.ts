import BashScriptRunner from './Bash/BashScriptRunner';
import BashScriptsEnum from './Bash/BashScriptsEnum';
import BashScriptFactory from './Bash/BashScriptFactory';
import { GetBashCommands } from './FileSearch';
import { CacheType, ChatInputCommandInteraction, InteractionResponse, MessagePayload, REST, Routes, TextChannel } from 'discord.js';
import { Client, Interaction } from 'discord.js'; // Import specific types for client and interaction

//Handles the Command inputted by the user
async function HandleCommand(interaction: ChatInputCommandInteraction<CacheType>, client: Client): Promise<void> {
    //Determine if the command is a Bash Related command or a configure related command
    if (Object.values(BashScriptsEnum).includes(interaction.commandName as BashScriptsEnum)) {
        await HandleBashCommand(interaction, client);
    } else {
        //Handle Configure command
    }
}

async function HandleBashCommand(interaction: ChatInputCommandInteraction<CacheType>, client: Client): Promise<void> {
    try {

        const Factory = new BashScriptFactory(interaction.commandName);
        const Bash = Factory.GetBashScript();
        const Factories = Factory.GetFactoriesToRun();

        let ResponseMessage = `Running ${interaction.commandName} :arrows_clockwise: \n`;

        const Response = await interaction.reply({ content: ResponseMessage, ephemeral: true }) as InteractionResponse;
        const logChannel = client.channels.cache.get(`${process.env.LOG_CHANNEL_ID}`) as TextChannel;

        for (const factoryInstance of Factories) {
            const bashInstance = factoryInstance.GetBashScript();
            logChannel.send(bashInstance.LogMessage);
            ResponseMessage += `${bashInstance.LogMessage} \n`;

            try {
                let BashResult = await new BashScriptRunner(factoryInstance).RunBashScript();

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

export { HandleCommand };
