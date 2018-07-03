export default class CanvasImage {
    constructor({ canvasElement, dimensions }) {
        this.canvasElement = canvasElement;
        this.ctx = this.canvasElement.getContext("2d");
        this.dimensions = dimensions;
        this.pixelCount = this.dimensions.width * this.dimensions.height;
        this.imageData = null;

        this._setCanvasSize();
    }

    clearCtx() {
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    }

    drawImage({ src, onLoad }) {
        const image = new Image();
        image.src = src;

        image.onload = () => {
            this.ctx.drawImage(image, 0, 0, this.dimensions.width, this.dimensions.height);
            onLoad();
        };
    }

    getUpdatedImageData() {
        this.setImageData();
        return this.imageData;
    }

    setImageData() {
        this.imageData = this.ctx.getImageData(0, 0, this.dimensions.width, this.dimensions.height).data;
    }

    _setCanvasSize() {
        this.canvasElement.width = this.dimensions.width;
        this.canvasElement.height = this.dimensions.height;
    }
}
