import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { StrategyBaseRender } from './renders/strategy.js'
import { MermaidRender } from './renders/mermaid.js'



export const bot = () => {

    let bot = new Telegraf(process.env.TELEGRAM);

    let render = new StrategyBaseRender(new MermaidRender())

    bot.on(message("text"), async (ctx) => {
        const image = await render.render(ctx.message.text);
        if(image)
            ctx.replyWithDocument({source:image, filename:"diagram.svg"})
    });

    return bot;
}
