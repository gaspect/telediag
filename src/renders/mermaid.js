import mermaid from 'mermaid';
import {renderMermaid} from "@mermaid-js/mermaid-cli";
import puppeteer from "puppeteer";
import {Render} from './render.js';

export class MermaidRender extends Render {
    constructor() {
        super();
    }

    async render(txt) {
        let code = txt;
        if (txt.includes('```mermaid'))
            code = txt.split('```mermaid')[1].split('```')[0].trim();
        if (!await mermaid.parse(code,{suppressErrors:true}))
            return null
        const browser = await puppeteer.launch({
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                headless: "new",
            });
            // noinspection JSCheckFunctionSignatures
        const {data} = await renderMermaid(browser, code, "svg", {
            backgroundColor: "white",
        });
        return Buffer.from(data);

    }
}