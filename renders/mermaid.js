import mermaid from 'mermaid';
import {renderMermaid} from "@mermaid-js/mermaid-cli";
import puppeteer from "puppeteer-core";
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
        try {
            const browser = await puppeteer.launch({
                executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                headless: "new",
            });
            // noinspection JSCheckFunctionSignatures
            const {data} = await renderMermaid(browser, code, "svg", {
                backgroundColor: "white",
            });
            return Buffer.from(data);
        } catch (e) {
            return null
        }

    }
}