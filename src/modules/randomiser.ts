import {Circ} from "./circ";
import {Circle} from "./circle";
import {Brush} from "./brushes";
import {CircGenerator, CircInterface} from "../structure";
import * as seedrandom from 'seedrandom';


class Randomiser implements CircGenerator {
    protected maxSteps = 40000;
    protected randomSeed;

    constructor(seed?: string) {
        seed && (
            this.randomSeed = seed,
            this.maxSteps = 400000
        );
    }

    public make(): Promise<CircInterface> {
        return new Promise((resolve, reject) => {
            let circ;
            let count = 0;

            while(typeof circ === 'undefined') {
                try {
                    circ = this.randomSeed ? this.generate(`${this.randomSeed}${count}`) : this.generate();
                } catch {
                    
                }
                count++;
            }

            this.randomSeed && (
                console.log(`found a valid seed: ${this.randomSeed}${count}`)
            )
            resolve(circ);
        });
    }

    protected generate(seed?: string): CircInterface {
        seed && (
            seedrandom(seed, { global: true })
        )
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
        circle.outside = true;
        circle.fixed = true;
        circle.clockwise = true;
        circle.stepMod = 0;
        circle.startAngle = 0;
        circle.radius = pr;


        const circle1 = new Circle();
        circle1.steps = cs;
        circle1.outside = this.getRandomBool();
        circle1.fixed = true;
        circle1.clockwise = this.getRandomBool();
        circle1.stepMod = 0;
        circle1.startAngle = 0;
        circle1.radius = cr;


        const circle2 = new Circle();
        circle2.steps = ccs;
        circle2.outside = this.getRandomBool();
        circle2.fixed = true;
        circle2.clockwise = this.getRandomBool();
        circle2.stepMod = 0;
        circle2.startAngle = 0;
        circle2.radius = ccr;

        const brush = new Brush();
        brush.color = '#FFFFFF';
        brush.degrees = 0;
        brush.link = true;
        brush.offset = 0;
        brush.point = 0.5;

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

    protected getRandomHexColour(): string {
        return `#${Math.floor(Math.random()*16777215).toString(16)}`;
    }
}

export {
    Randomiser,
};
