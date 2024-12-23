import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { StrategyBaseRender } from './renders/strategy.js'
import { MermaidRender } from './renders/mermaid.js'



export const bot = () => {

    let bot = new Telegraf(process.env.TELEGRAM);

    let render = new StrategyBaseRender(new MermaidRender())

    bot.on(message("text"), async (ctx) => {
        try{
            const image = await render.render(ctx.message.text);
            if(image)
                ctx.replyWithDocument({source:image, filename:"diagram.svg"})
        }catch (e) {
            if(process.env.DEBUG && process.env.DEBUG === "True")
                ctx.reply(e.message)
        }

    });

    return bot;
}
