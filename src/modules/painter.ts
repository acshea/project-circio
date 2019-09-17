import {CircInterface, CircleInterface, CirclePainterInterface, PositionInterface, ShapeInterface} from "../structure";

export default class Painter implements CirclePainterInterface {
    protected canvasContext: CanvasRenderingContext2D;
    protected canvasCenter: PositionInterface = new CanvasCenter();
    
    constructor(canvasContext: CanvasRenderingContext2D) {
        this.canvasContext = canvasContext;
    }
    
    clear(): void {
        this.canvasContext.clearRect(-this.canvasContext.canvas.width/2, -this.canvasContext.canvas.height/2, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
    }

    draw(circ: CircInterface): void {
        this.centerCanvas(circ);

        circ.getShapes().forEach((shape: ShapeInterface) => {
            if (shape.brushes.length === 0) {
                return;
            }
            
            this.drawPoints(shape);
        })
    }

    protected centerCanvas(circ: CircInterface) {
        if (this.canvasCenter.x !== (circ.width/2)) {
            this.canvasContext.translate(-this.canvasCenter.x, 0);
            this.canvasContext.translate((circ.width/2), 0);
            this.canvasCenter.x = (circ.width/2);
        }
        if (this.canvasCenter.y !== (circ.height/2)) {
            this.canvasContext.translate(0,-this.canvasCenter.y);
            this.canvasContext.translate(0,(circ.height/2));
            this.canvasCenter.y = (circ.height/2);
        }
    }

    exportImageAsDataURL(): string {
        return "";
    }

    drawPoints (shape: ShapeInterface) {

        shape.brushes.forEach(brush => {
            const radians = shape.state.getAngle();
            const x = shape.state.drawPoint.x + (Math.cos(radians + (brush.degrees * (Math.PI/180))) * brush.offset);
            const y = shape.state.drawPoint.y + (Math.sin(radians + (brush.degrees * (Math.PI/180))) * brush.offset);
            const color = brush.color;

            if(brush.link === true) {
                // console.log(circle.state);
                const previousX = shape.state.previousState.drawPoint.x + (Math.cos(radians + (brush.degrees * (Math.PI/180))) * brush.offset);
                const previousY = shape.state.previousState.drawPoint.y + (Math.sin(radians + (brush.degrees * (Math.PI/180))) * brush.offset);
                this.canvasContext.strokeStyle = color;
                this.canvasContext.beginPath();
                this.canvasContext.moveTo(previousX, previousY);
                this.canvasContext.lineTo(x, y);
                this.canvasContext.lineWidth = brush.point;
                this.canvasContext.stroke();
            } else {
                this.canvasContext.fillStyle = color;
                this.canvasContext.beginPath();
                this.canvasContext.arc(x, y, brush.point, 0, 2*Math.PI);
                this.canvasContext.fill();
            }
        });
    };

}

class CanvasCenter implements PositionInterface {
    x: number = 0;
    y: number = 0;
}
