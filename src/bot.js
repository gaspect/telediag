import {Telegraf} from 'telegraf';
import {message} from 'telegraf/filters';
import {debug} from "./utils.js";

/**
 * @param {{ render:Function }} render.
 */
export const bot = (render) => {

    let bot = new Telegraf(process.env.TELEGRAM);

    bot.on(message("text"), async (ctx) => {
        try {
            const images = await render.render(ctx.message);
            if (images)
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
