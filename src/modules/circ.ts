import {
    CircConfigInterface,
    CircInterface,
    CircleInterface,
    EventEmitter,
    ShapeInterface
} from "../structure";
import {AttributeChangedEvent, ShapeAddEvent, ShapeDeleteEvent} from "./events";

class Circ extends EventEmitter implements CircInterface {
    protected config: CircConfigInterface = new CircConfig();
    protected shapes: ShapeInterface[] = [];

    addShape(shape: ShapeInterface): void {
        shape.isRoot = (this.shapes.length === 0);
        this.shapes.push(shape);
        this.dispatchEvent(new ShapeAddEvent(shape))
    }

    removeShape(id: number): void {
        const shapesRemoved = [];
        this.shapes = this.shapes.filter((shape: ShapeInterface): boolean => {
            const remove = shape.id !== id;

            if (remove === true) {
                shapesRemoved.push(shape);
            }

            return remove;
        });

        shapesRemoved.forEach((shape: ShapeInterface) => {
            this.dispatchEvent(new ShapeDeleteEvent(shape));
        });
    }

    getShapes(): ShapeInterface[] {
        return this.shapes;
    }

    get name(): string {
        return this.config['name'];
    }

    set name(name: string) {
        this.config['name'] = name;
        this.dispatchEvent(new AttributeChangedEvent('name', this.name));
    }

    get height(): number {
        return this.config.height;
    }

    set height(height: number) {
        this.config.height = height;
        this.dispatchEvent(new AttributeChangedEvent('height', this.height));
    }

    get width(): number {
        return this.config.width;
    }

    set width(width: number) {
        this.config.width = width;
        this.dispatchEvent(new AttributeChangedEvent('width', this.width));
    }

    get backgroundFill(): string {
        return this.config.backgroundFill;
    }

    set backgroundFill(backgroundFill: string) {
        this.config.backgroundFill = backgroundFill;
        this.dispatchEvent(new AttributeChangedEvent('backgroundFill', this.backgroundFill));
    }

    get modified(): boolean {
        return this.config.modified;
    }

    get stepsToComplete(): number {
        if (this.getShapes().length !== 3) {
            throw 'currently only works for 3 shape circs'
        }

        if (this.getShapes()[0].steps !== 0) {
            throw 'currently only works for motionless root shape'
        }

        const pr = (this.getShapes()[0] as CircleInterface).radius;
        const cr = (this.getShapes()[1] as CircleInterface).radius;
        const ccr = (this.getShapes()[2] as CircleInterface).radius;

        const ps = this.getShapes()[0].steps;
        const cs = this.getShapes()[1].steps;
        const ccs = this.getShapes()[2].steps;

        const prCrRatio = pr / cr;
        const CrCcrRatio = cr / ccr;
        let multiple = null;

        for (let i = 1; i < 20; i++) {
            if ((prCrRatio * i) % 1 === 0 && (CrCcrRatio * i) % 1 === 0) {
                multiple = i;
                break;
            }
        }

        if (multiple == null) {
            return Infinity;
        }

        const childStepsToComplete = cs*prCrRatio*multiple;
        const childchildStepsToComplete = ccs*CrCcrRatio*multiple;

        return this.lcm(childStepsToComplete,childchildStepsToComplete);
    }

    protected lcm(x, y) {
        return Math.abs((x * y) / this.gcd(x, y));
    }

    protected gcd(x, y) {
        x = Math.abs(x);
        y = Math.abs(y);
        while(y) {
            var t = y;
            y = x % y;
            x = t;
        }
        return x;
    }
}

class CircConfig implements CircConfigInterface {
    name: string;
    height: number;
    width: number;
    backgroundFill: string;
    stepsToComplete: number;
    modified: boolean;
}

export {
    Circ,
    CircConfig,
}
