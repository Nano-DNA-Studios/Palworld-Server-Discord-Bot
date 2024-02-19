"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConfigureCommands = exports.GetFiles = exports.GetBashCommands = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * Gets all the files in a directory
 * @param relativePath The relative path to the directory
 * @returns The files in the directory
 */
function GetFiles(relativePath) {
    const directoryPath = path.join(__dirname, relativePath); // path to your directory
    if (fs.existsSync(directoryPath))
        return fs.readdirSync(directoryPath);
    else
        return [];
}
exports.GetFiles = GetFiles;
/**
 * Gets all the Bash Commands
 * @returns Array of Bash Commands
 */
function GetBashCommands() {
    const Path = "Bash/BashCommands";
    let Files = GetFiles(Path);
    let Commands = [];
    Files.forEach(file => {
        if (path.extname(file) === ".js") {
            // Dynamic imports in TypeScript might require a workaround or explicit any cast
            const module = require(`./${Path}/${file}`);
            if ('CommandName' in module)
                Commands.push(module);
        }
    });
    return Commands;
}
exports.GetBashCommands = GetBashCommands;
/**
 * Gets all the Configure Commands
 * @returns Array of Configure Commands
 */
function GetConfigureCommands() {
    const Path = "ConfigureCommands/Commands";
    let Files = GetFiles(Path);
    let Commands = [];
    Files.forEach(file => {
        if (path.extname(file) === ".js") {
            // Dynamic imports in TypeScript might require a workaround or explicit any cast
            const module = require(`./${Path}/${file}`);
            if ('CommandName' in module)
                Commands.push(module);
        }
    });
    return Commands;
}
exports.GetConfigureCommands = GetConfigureCommands;
