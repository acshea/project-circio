import '../structure';
import {BrushInterface, CircleInterface, PositionInterface, ShapeStateInterface} from "../structure";

class Circle implements CircleInterface {
    brushes: BrushInterface[] = [];
    clockwise: boolean;
    fixed: boolean;
    id: number;
    outside: boolean;
    radius: number;
    startAngle: number;
    state: ShapeStateInterface = new CircleState();
    stepMod: number;
    steps: number;
    isRoot: boolean;


    constructor() {
        this.saveInitialState();
    }

    calculatePosition(parentCircle: CircleInterface|null): void {
        this.savePreviousState();

        let arc = this.getArc();
        let stepCount = this.getStepCount();
        let distanceTravelled = arc * stepCount;
        let arcToParentRadians = 0;
        let parentRadians = parentCircle !== null && this.fixed === true ? parentCircle.state.getAngle():0;
        let radiusRelative = 0;
        let parentCentreX = this.state.centre.x;
        let parentCentreY = this.state.centre.y;

        if (parentCircle !== null) {
            parentCentreX = parentCircle.state.centre.x;
            parentCentreY = parentCircle.state.centre.y;

            arcToParentRadians = (distanceTravelled / parentCircle.radius);
            if(this.outside === false) {
                arcToParentRadians *= -1;
            }

            // The distance from center to center of child and parent
            if(this.outside === true) {
                radiusRelative = parentCircle.radius + this.radius;
            } else {
                radiusRelative = parentCircle.radius - this.radius;
            }
        }

        this.state.centre.x = parentCentreX + (Math.cos(parentRadians + arcToParentRadians) * radiusRelative);
        this.state.centre.y = parentCentreY + (Math.sin(parentRadians + arcToParentRadians) * radiusRelative);

        // New x1 & y1 to reflect change in radians
        this.state.drawPoint.x = this.state.centre.x + (Math.cos(parentRadians + arcToParentRadians + this.state.totalAngle) * this.radius);
        this.state.drawPoint.y = this.state.centre.y + (Math.sin(parentRadians + arcToParentRadians + this.state.totalAngle) * this.radius);
    }

    public calculateAngle(): void {
        this.savePreviousState();
        if (this.clockwise === true) {
            this.state.totalAngle += this.getStepRadians();
        } else {
            this.state.totalAngle -= this.getStepRadians();
        }
    }

    protected savePreviousState() {
        const previousState = new CircleState();
        previousState.drawPoint = Object.assign({},this.state.drawPoint);
        previousState.centre = Object.assign({},this.state.centre);
        previousState.initialState = Object.assign({},this.state.initialState);
        previousState.totalAngle = this.state.totalAngle;

        this.state.previousState = previousState;
    }

    protected saveInitialState() {
        const initialState = new CircleState();
        initialState.drawPoint = Object.assign({},this.state.drawPoint);
        initialState.centre = Object.assign({},this.state.centre);
        initialState.initialState = Object.assign({},this.state.initialState);
        initialState.totalAngle = this.state.totalAngle;

        this.state.initialState = initialState;
    }

    protected getArc () {
        if (this.steps === 0) {
            return 0;
        }

        return this.radius*this.getStepRadians();
    }

    protected getStepRadians () {
        let stepRadian = 0;
        if(this.steps > 0) {
            stepRadian = (Math.PI*2)/this.steps;
        }

        return stepRadian;
    }

    protected getStepCount () {
        let stepCount = 0;
        if(this.steps > 0) {
            stepCount = this.state.totalAngle/this.getStepRadians();
        }

        return stepCount;
    }

    reset(): void {
        this.state = this.state.initialState;

        // Create a new initial state object
        this.saveInitialState();
    }
}

class CircleState implements ShapeStateInterface {
    centre: PositionInterface = new CircleCenterPosition();
    drawPoint: PositionInterface = new CircleDrawPosition();
    initialState: ShapeStateInterface = Object.create(this);
    previousState: ShapeStateInterface = null;
    totalAngle: number = 0;

    public getAngle(): number {
        return Math.atan2(
            (this.drawPoint.y - this.centre.y), // Delta Y
            (this.drawPoint.x - this.centre.x) // Delta X
        );
    }
}

class CircleCenterPosition implements PositionInterface {
    x: number = 0;
    y: number = 0;
}

class CircleDrawPosition implements PositionInterface {
    x: number;
    y: number;
}

export {
    Circle,
    CircleState,
    CircleCenterPosition,
    CircleDrawPosition,
}
