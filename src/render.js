import fetch from "node-fetch";
import {debug} from "./utils.js";

export class StrategyBaseRenderProxy {

    /**
     * @param {{ url:string, languages:Array<string> }} options.
     */
    constructor(options) {
        this.options = options
    }

    /**
     * @param  {{ text:string, entities:Array.<{offset:bigint, length:bigint, language:string}> }} message
     * @return { Promise<Array<Buffer>> } The image.
     */
    async render(message) {
        return (await Promise.all(("entities" in message ? message["entities"] : []).filter(
            e => "language" in e && this.options.languages.includes(e["language"])
        ).map(
            async e => {
                try {
                    let response = await fetch(`${this.options.url}`, {
                        method: 'POST',
                        body: JSON.stringify({
                            diagram_source: message.text.slice(e.offset, e.offset + e.length),
                            diagram_type: e["language"],
                            output_format: "png"
                        })
                    })
                    return response.ok ? Buffer.from(new Uint8Array(await response.arrayBuffer())) : null
                } catch (e) {
                    if (debug)
                        console.warn(e.message)
                    return null
                }

            }
        ))).filter(e => e)
    }
}
