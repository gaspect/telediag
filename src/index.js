import { config } from 'dotenv';
import { bot } from './bot.js';

config()
// noinspection JSIgnoredPromiseFromCall
if(process.env.DOMAIN &&  process.env.PORT)
    bot().launch({
        webhook:{
            domain: process.env.DOMAIN,
            port: process.env.PORT
        }
    })
else
    bot().launch()
