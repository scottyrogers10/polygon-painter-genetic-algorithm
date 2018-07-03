import { getRandomInt } from "../utils/helpers";

export default class Polygon {
    constructor({ genes, canvasDimensions, vertexCount }) {
        this.canvasDimensions = canvasDimensions;
        this.x = genes.x || getRandomInt(this.canvasDimensions.width);
        this.y = genes.y || getRandomInt(this.canvasDimensions.height);
        this.vertices = genes.vertices || this._getRandomVertices(vertexCount);
        this.r = genes.r || getRandomInt(255);
        this.g = genes.g || getRandomInt(255);
        this.b = genes.b || getRandomInt(255);
        this.a = genes.a || getRandomInt(250);
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a / 255})`;
        ctx.beginPath();
        ctx.moveTo(this.vertices[0].x, this.vertices[0].y);

        for (let i = 1; i < this.vertices.length; i++) {
            ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
        }

        ctx.closePath();
        ctx.fill();
    }

    mutate() {
        const randomProperty = getRandomInt(5);

        const propertyMutations = [
            () => this._randomlyMutateSingleVertix(),
            () => (this.r = this._getControlledRandomInt(this.r, 25, 255)),
            () => (this.g = this._getControlledRandomInt(this.g, 25, 255)),
            () => (this.b = this._getControlledRandomInt(this.b, 25, 255)),
            () => (this.a = this._getControlledRandomInt(this.a, 22, 250))
        ];

        propertyMutations[randomProperty]();
    }

    _getRandomVertices(vertexCount) {
        return Array.from({ length: vertexCount }, () => {
            return {
                x: getRandomInt(this.canvasDimensions.width),
                y: getRandomInt(this.canvasDimensions.height)
            };
        });
    }

    _randomlyMutateSingleVertix() {
        const randomIndex = getRandomInt(this.vertices.length);

        this.vertices = this.vertices.map((vertex, index) => {
            if (index === randomIndex) {
                return {
                    x: this._getControlledRandomInt(this.vertices[randomIndex]["x"], 25, this.canvasDimensions.width),
                    y: this._getControlledRandomInt(this.vertices[randomIndex]["y"], 25, this.canvasDimensions.height)
                };
            } else {
                return vertex;
            }
        });
    }

    _getControlledRandomInt(currentVal, diffMax, max) {
        const rand = getRandomInt(diffMax);
        const multiplier = Math.random() < 0.5 ? 1 : -1;

        const adjustment = currentVal + rand * multiplier;

        if (adjustment > max || adjustment < 0) {
            return currentVal + rand * multiplier * -1;
        } else {
            return adjustment;
        }
    }
}
