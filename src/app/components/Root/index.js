import React, { Component } from "react";
import coreFactory from "../../factories/core";
import albertEinstein from "../../images/albert-einstein.jpg";
import styles from "./styles";

class Root extends Component {
    constructor() {
        super();

        this.population = null;
        this.canvasImages = {
            src: null,
            output: null,
            fitness: null
        };

        this.state = {
            generationCount: 0,
            fitnessPercentage: 0,
            isTraining: true
        };

        this._playPauseOnClickHandler = this._playPauseOnClickHandler.bind(this);
    }

    _init() {
        this._initCanvasImages({
            onLoad: () => {
                this.canvasImages.src.setImageData();
                this._initPopulation();
            }
        });
    }

    _initCanvasImages({ onLoad }) {
        Object.keys(this.canvasImages).forEach(key => {
            const canvasElement = document.getElementById(`${key}-canvas`);
            this.canvasImages[key] = coreFactory.getCanvasImage(canvasElement);
        });

        this.canvasImages.src.drawImage({
            src: albertEinstein,
            onLoad
        });
    }

    _initPopulation() {
        this.population = coreFactory.getPopulation(this.canvasImages);
    }

    _run() {
        setInterval(() => {
            const isReady = this.canvasImages.src.imageData && this.population && this.state.isTraining;
            this._loop(isReady);
        }, 0);
    }

    _loop(isReady) {
        if (isReady) {
            this.population.breed();
            this.setState(prevState => {
                return {
                    fitnessPercentage: this.population.getFittestPainting().fitness,
                    generationCount: prevState.generationCount + 1
                };
            });
        }
    }

    _playPauseOnClickHandler() {
        this.setState(prevState => {
            return {
                isTraining: !prevState.isTraining
            };
        });
    }

    componentDidMount() {
        this._init();
        this._run();
    }

    render() {
        return (
            <div style={{ ...styles.container, ...this.props.style }}>
                <canvas style={{ marginRight: "16px" }} id={"src-canvas"} />
                <canvas style={{ marginRight: "16px" }} id={"output-canvas"} />
                <canvas id={"fitness-canvas"} />
                <div style={{ padding: "24px 0 0 24px" }}>{`Fitness: ${(this.state.fitnessPercentage * 100).toFixed(
                    2
                )}%`}</div>
                <div style={{ paddingLeft: "24px" }}>{`Generation: ${this.state.generationCount}`}</div>
                <button onClick={this._playPauseOnClickHandler} style={{ marginTop: "24px" }}>
                    Start/Pause
                </button>
            </div>
        );
    }
}

export default Root;
