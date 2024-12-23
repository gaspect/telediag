import { config } from 'dotenv';
import { bot } from './bot.js';
import { render as MermaidRender } from './renders/mermaid.js'
import { render as PlantUmlRender} from "./renders/plantuml.js";
import { StrategyBaseRenderProxy } from "./renders/strategy.js";

config()

const launchOptions = process.env.DOMAIN && process.env.PORT ? {
    webhook: {
        domain: process.env.DOMAIN,
        port: process.env.PORT
    }
} : {};

bot(new StrategyBaseRenderProxy({
    "mermaid": MermaidRender,
    "plantuml": PlantUmlRender
})).launch(launchOptions).then(() => console.log("👋"));

