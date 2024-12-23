import { config } from 'dotenv';
import { bot } from './bot.js';

config()
// noinspection JSIgnoredPromiseFromCall

bot().launch({
    webhook:{
        domain: process.env.DOMAIN,
        port: process.env.PORT
    }
})
