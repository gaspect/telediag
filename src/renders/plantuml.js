import plantuml from 'node-plantuml'
import {Render} from './render.js';
import streamBuffers, {WritableStreamBuffer} from 'stream-buffers'

class PlantUmlRender extends Render {
    constructor() {
        super();
    }

    async render(txt) {
        return new Promise((resolve, reject) => {
            // Crear un flujo de memoria para el diagrama
            const bufferStream = new streamBuffers.WritableStreamBuffer({
                initialSize: (100 * 1024), // tamaño inicial del buffer
                incrementAmount: (10 * 1024) // incremento del buffer
            });

            // Generar el diagrama y escribirlo en el flujo de memoria
            plantuml.generate(txt, {format: 'png'}).out.pipe(bufferStream);

            bufferStream.on('finish', () => {
                const buffer = bufferStream.getContents();
                if (buffer) {
                    resolve(buffer);
                } else {
                    reject(new Error('Error al generar el diagrama'));
                }
            });
        });
    }
}

export const render = new PlantUmlRender()