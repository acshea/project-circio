import {Circ} from "./circ";
import {Circle} from "./circle";
import {Brush} from "./brushes";
import {CircGenerator, CircInterface} from "../structure";


class Randomiser implements CircGenerator {
    protected maxSteps = 40000;

    public make(): Promise<CircInterface> {
        return new Promise((resolve, reject) => {
            let circ;
            while(typeof circ === 'undefined') {
                try {
                    circ = this.generate()
                } catch {

                }
            }

            resolve(circ);
        });
    }

    protected generate(): CircInterface {
        const pr = 150;
        const cr = this.getRandomInt(10, 250);
        const ccr = this.getRandomInt(10, 250);
        const ps = 0;
        const cs = this.getRandomInt(500, 1500);
        const ccs = this.getRandomInt(500, 1500);

        const circ = new Circ();
        circ.width = 1080;
        circ.height = 1080;
        circ.backgroundFill = '#1b5eec';


        const circle = new Circle();
        circle.steps = ps;
        circle.radius = pr;


        const circle1 = new Circle();
        circle1.steps = cs;
        circle1.clockwise = this.getRandomBool();
        circle1.radius = cr;
        circle1.outside = circle.radius === circle1.radius ? true:this.getRandomBool();


        const circle2 = new Circle();
        circle2.steps = ccs;
        circle2.clockwise = this.getRandomBool();
        circle2.radius = ccr;
        circle1.outside = circle1.radius === circle2.radius ? true:this.getRandomBool();

        const brush = new Brush();

        circle2.addBrush(brush);

        circ.addShape(circle);
        circ.addShape(circle1);
        circ.addShape(circle2);

        const stepsToComplete = circ.stepsToComplete;

        if (stepsToComplete > this.maxSteps) {
            throw 'too many steps'
        }

        console.log(pr,cs,cr,cs,ccr,ccs,stepsToComplete);

        return circ;
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

    protected getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    protected getRandomBool(): boolean {
        return this.getRandomInt(0,1) ? true:false;
    }
}

export {
    Randomiser,
};
