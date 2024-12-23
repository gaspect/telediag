import {Render} from './render.js';

export class StrategyBaseRenderProxy {
    /**
     * @param {Object.<string, Render>} strategies.
     */
    constructor(strategies) {
        this.strategies = strategies;
    }

    /**
     * @param  {{ text:string, entities:Array.<{offset:bigint, length:bigint, language:string}> }} message
     * @return { Promise<Array<Buffer>> } The image.
     */
    async render(message) {
        return Promise.all(("entities" in message ? message["entities"] : []).filter(
            e => "language" in e && e["language"] in this.strategies
        ).map(
            e => this.strategies[e["language"]].render(message.text.slice(e.offset, e.offset + e.length))
        ))
    }
}