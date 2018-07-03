import app from "../configs/app";
import CanvasImage from "../core/CanvasImage";
import Population from "../core/Population";
import Painting from "../core/Painting";
import DNA from "../core/DNA";
import Polygon from "../core/Polygon";

const getCanvasImage = canvasElement => {
    return new CanvasImage({ canvasElement, dimensions: { width: app.WIDTH, height: app.HEIGHT } });
};

const getPopulation = canvasImages => {
    return new Population({ size: app.POPULATION_SIZE, canvasImages });
};

const getPainting = ({ dna, canvasImages }) => {
    return new Painting({ dna, canvasImages });
};

const getDNA = ({ canvasImages, polygons }) => {
    return new DNA({ canvasImages, size: app.DNA_SIZE, polygons });
};

const getPolygon = (genes = {}) => {
    return new Polygon({
        genes,
        canvasDimensions: { width: app.WIDTH, height: app.HEIGHT },
        vertexCount: app.VERTEX_COUNT
    });
};

export default {
    getCanvasImage,
    getPopulation,
    getPainting,
    getDNA,
    getPolygon
};
