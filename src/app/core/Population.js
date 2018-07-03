import coreFactory from "../factories/core";
import { getRandomInt } from "../utils/helpers";

export default class Population {
    constructor({ canvasImages, size }) {
        this.canvasImages = canvasImages;
        this.size = size;
        this.paintings = this._getPaintings();
    }

    breed() {
        this._draw();
        this._crossover();
        this._calculateFitness();
    }

    getFittestPainting() {
        this._sortPaintingsByFitness();
        return this.paintings[0];
    }

    _calculateFitness() {
        const fitnessCanvasImage = this.canvasImages.fitness;

        this.paintings.forEach(painting => {
            fitnessCanvasImage.clearCtx();
            painting.draw(fitnessCanvasImage.ctx);
            painting.setFitness();
        });
    }

    _draw() {
        const fittestPainting = this.getFittestPainting();
        this.canvasImages.output.clearCtx();
        fittestPainting.draw(this.canvasImages.output.ctx);
    }

    _crossover() {
        let nextGeneration = [];
        this._sortPaintingsByFitness();

        this.paintings.forEach(() => {
            const parentA = this._getRandomFitParent();
            const parentB = this._getRandomFitParent();
            const childDna = parentA.dna.getChild(parentB.dna);

            nextGeneration.push(coreFactory.getPainting({ dna: childDna, canvasImages: this.canvasImages }));
        });

        this.paintings = nextGeneration;
    }

    _getPaintings() {
        return Array.from({ length: this.size }, () => coreFactory.getPainting({ canvasImages: this.canvasImages }));
    }

    _getRandomFitParent() {
        const randomIndex = getRandomInt(Math.floor(this.paintings.length * 0.15));
        return this.paintings[randomIndex];
    }

    _sortPaintingsByFitness() {
        this.paintings = this.paintings.sort((a, b) => b.fitness - a.fitness);
    }
}
