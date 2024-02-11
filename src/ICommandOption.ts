import OptionTypes from "./CommandOptionTypes";

/**
 * Describes the structure of a commands option
 */
interface ICommandOption 
{
    /**
     * Describes the Value type the option will take
     */
    type: OptionTypes;

    /**
     * The name of the option
     */
    name: string;

    /**
     * The description of the option
     */
    description: string;

    /**
     * Whether the option is required
     */
    required: boolean;
}


export = ICommandOption;