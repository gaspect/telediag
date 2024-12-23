import  { Render } from './render.js';

export  class StrategyBaseRender extends  Render{

    constructor(...strategies) {
        super()
        this.strategies = strategies;
    }

    async render(txt){
      for (const value in this.strategies){
        let result = await  this.strategies[value].render(txt);
        if(result)
            return result;
      }
      return null
    }
}