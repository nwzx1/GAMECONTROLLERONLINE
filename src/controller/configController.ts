class ConfigController {

    private video: HTMLVideoElement;
    private canvas: HTMLCanvasElement;
    private context:CanvasRenderingContext2D | null;


    constructor({ video, canvas }: {
        video: HTMLVideoElement,
        canvas: HTMLCanvasElement
    }) {
        this.canvas = canvas;
        this.video = video;
        this.context = canvas.getContext('2d')
    }
}