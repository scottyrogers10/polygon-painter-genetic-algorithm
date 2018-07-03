import { getAbsoluteDifference } from "../utils/helpers";
import coreFactory from "../factories/core";

export default class Painting {
    constructor({ dna, canvasImages }) {
        this.canvasImages = canvasImages;
        this.dna = dna || coreFactory.getDNA(canvasImages);
        this.fitness = 0;
    }

    draw(ctx) {
        this.dna.polygons.forEach(polygon => {
            polygon.draw(ctx);
        });
    }

    setFitness() {
        const fitnessImgData = this.canvasImages.fitness.getUpdatedImageData();
        const srcImgData = this.canvasImages.src.imageData;
        let pixelDiff = 0;

        for (let i = 0; i < this.canvasImages.src.pixelCount * 4; i++) {
            pixelDiff += getAbsoluteDifference(srcImgData[i], fitnessImgData[i]);
        }

        this.fitness = 1 - pixelDiff / (this.canvasImages.src.pixelCount * 4 * 256);
    }
}
