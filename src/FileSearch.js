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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class FileSearch {
    constructor(dataManager) {
        this._dataManager = dataManager;
    }
    /**
    * Gets all the files with JavaScript endings in the Bot Directory
    * @returns An Array of Java Script File Paths within the Bot Directory
    */
    GetAllJSFiles() {
        const directoryPath = this._dataManager.BOT_DIRECTORY;
        return this.GetFiles(directoryPath);
    }
    /**
    * Gets all the Java Script Files within the provided directory and subdirectories through recursion
    * @param Path The start Path to search for files
    * @returns Array of all Java Script Files within the provided directory and subdirectories
    */
    GetFiles(Path) {
        let AllFiles = [];
        if (fs.existsSync(Path)) {
            let files = fs.readdirSync(Path);
            files.forEach(file => {
                let absPath = Path + "/" + file;
                if (fs.lstatSync(absPath).isDirectory())
                    AllFiles.push(...this.GetFiles(absPath));
                else if (path.extname(absPath) === ".js")
                    AllFiles.push(absPath);
            });
        }
        return AllFiles;
    }
    /**
    * Gets all the Commands from the Provided Directory
    * @returns Array of IT Command Objects
    */
    GetAllCommands() {
        let Commands = [];
        const Files = this.GetAllJSFiles();
        Files.forEach(file => {
            const module = require(file);
            if ('CommandName' in module)
                Commands.push(module);
        });
        return Commands;
    }
}
exports.default = FileSearch;
