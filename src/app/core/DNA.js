import coreFactory from "../factories/core";

export default class DNA {
    constructor({ polygons, size, canvasImages }) {
        this.size = size;
        this.canvasImages = canvasImages;
        this.polygons = polygons || this._getRandomPolygons();
    }

    getChild(partner) {
        let polygons = [];

        for (let i = 0; i < this.size; i++) {
            let parentPolygon = Math.random() < 0.5 ? this.polygons[i] : partner.polygons[i];

            if (this._isMutated()) {
                parentPolygon.mutate();
            }

            polygons.push(
                coreFactory.getPolygon({
                    x: parentPolygon.x,
                    y: parentPolygon.y,
                    vertices: parentPolygon.vertices,
                    r: parentPolygon.r,
                    g: parentPolygon.g,
                    b: parentPolygon.b,
                    a: parentPolygon.a
                })
            );
        }

        return coreFactory.getDNA({ polygons, canvasImages: this.canvasImages });
    }

    _getRandomPolygons() {
        return Array.from({ length: this.size }, () => coreFactory.getPolygon());
    }

    _isMutated() {
        return Math.random() < 0.01;
    }
}
