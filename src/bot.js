import {Telegraf} from 'telegraf';
import {message} from 'telegraf/filters';
import {debug, langs} from "./utils.js";

/**
 * @param {{ render:Function }} render.
 */
export const bot = (render) => {

    let bot = new Telegraf(process.env.TELEGRAM);

    const info = async (ctx) => {
        ctx.reply(
            'This bot converts diagrams as markdown code into images. ' +
            'It accepts the following languages: ' +
            langs.join(", ") + '. Right now is an Alpha Test.'
        )
    }

    bot.start(info)
    bot.command('help', info)

    bot.on(message("text"), async (ctx) => {
        try {
            const images = await render.render(ctx.message);
            if (images.length)
                ctx.replyWithMediaGroup(images.map(img => ({
                    type: "photo",
                    media: {source: img}
                })), {reply_to_message_id: ctx.message.message_id})
        } catch (e) {
            if (debug)
                ctx.reply(e.message, {reply_to_message_id: ctx.message.message_id})
        }
    });

    return bot;
}
