import mermaid from 'mermaid';
import {renderMermaid} from "@mermaid-js/mermaid-cli";
import puppeteer from "puppeteer";
import {Render} from './render.js';
import {debug} from "../utils.js";

class MermaidRender extends Render {
    constructor() {
        super();
    }

    /**
     * @param {string} txt
     */
    async render(txt) {
        try {
            let browser = await puppeteer.launch();
            let {data} = await renderMermaid(browser, txt, "png", {
                backgroundColor: "white",
            });
            return Buffer.from(data);
        } catch (e) {
            if (debug)
                console.warn(e.message)
        }
    }
}

export const render = new MermaidRender()