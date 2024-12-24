import {config} from 'dotenv';
import {bot} from './bot.js';
import {StrategyBaseRenderProxy} from "./render.js";
import {langs} from "./utils.js";

config()

const launchOptions = process.env.DOMAIN && process.env.PORT ? {
    webhook: {
        domain: process.env.DOMAIN,
        port: process.env.PORT
    }
} : {};

const tbot = bot(new StrategyBaseRenderProxy({
    url: process.env.URL,
    languages: langs
}))

tbot.launch(launchOptions).then(() => console.log("👋"));

process.once('SIGINT', () => tbot.stop('SIGINT'))
process.once('SIGTERM', () => tbot.stop('SIGTERM'))
