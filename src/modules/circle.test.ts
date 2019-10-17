import { Brush } from './brushes';
import { Circle } from './circle';
import { AttributeChangedEvent } from './events';

describe('Circle', () => {
    describe('constructor', () => {
        it('should create a valid Circle', () => {
            const circle = new Circle();
            expect(circle).not.toBe(null);
        });
    });

    describe('addBrush', () => {
        let circle;
        let brush;
        beforeEach(() => {
            circle = new Circle();
            brush = new Brush();
        });

        it('should add the brush to the brushes array', () => {
            circle.addBrush(brush);
            expect(circle.brushes).toEqual([brush]);
        });
    });

    describe('getBrushes', () => {
        let circle;
        let brush;
        beforeEach(() => {
            circle = new Circle();
            brush = new Brush();
        });

        it('should return the brushes', () => {
            circle.brushes = [brush];
            expect(circle.getBrushes()).toEqual([brush]);
        });
    });

    describe('get/set steps', () => {
        let circle;
        const steps = 10;

        beforeEach(() => {
            circle = new Circle();
            circle.dispatchEvent = jest.fn();
        });

        describe('set steps', () => {
            it('should set the value of steps', () => {
                circle.steps = steps;
                expect(circle.config.steps).toEqual(steps);
            });

            it('should call the dispatchEvent exactly once with the correct AttributeChangedEvent', () => {
                circle.steps = steps;
                expect(circle.dispatchEvent).toHaveBeenCalledTimes(1);
                expect(circle.dispatchEvent).toHaveBeenCalledWith(new AttributeChangedEvent('steps', steps));
            });
        });

        describe('get steps', () => {
            it('should get the value of steps', () => {
                circle.config.steps = steps;
                expect(circle.steps).toEqual(steps);
            });
        });
    });

    describe('get/set outside', () => {
        let circle;
        const outside = true;

        beforeEach(() => {
            circle = new Circle();
            circle.dispatchEvent = jest.fn();
        });

        describe('set outside', () => {
            it('should set the value of outside', () => {
                circle.outside = outside;
                expect(circle.config.outside).toEqual(outside);
            });

            it('should call the dispatchEvent exactly once with the correct AttributeChangedEvent', () => {
                circle.outside = outside;
                expect(circle.dispatchEvent).toHaveBeenCalledTimes(1);
                expect(circle.dispatchEvent).toHaveBeenCalledWith(new AttributeChangedEvent('outside', outside));
            });
        });

        describe('get outside', () => {
            it('should get the value of outside', () => {
                circle.config.outside = outside;
                expect(circle.outside).toEqual(outside);
            });
        });
    });

    describe('get/set fixed', () => {
        let circle;
        const fixed = true;

        beforeEach(() => {
            circle = new Circle();
            circle.dispatchEvent = jest.fn();
        });

        describe('set fixed', () => {
            it('should set the value of fixed', () => {
                circle.fixed = fixed;
                expect(circle.config.fixed).toEqual(fixed);
            });

            it('should call the dispatchEvent exactly once with the correct AttributeChangedEvent', () => {
                circle.fixed = fixed;
                expect(circle.dispatchEvent).toHaveBeenCalledTimes(1);
                expect(circle.dispatchEvent).toHaveBeenCalledWith(new AttributeChangedEvent('fixed', fixed));
            });
        });

        describe('get fixed', () => {
            it('should get the value of fixed', () => {
                circle.config.fixed = fixed;
                expect(circle.fixed).toEqual(fixed);
            });
        });
    });

    describe('get/set clockwise', () => {
        let circle;
        const clockwise = false;

        beforeEach(() => {
            circle = new Circle();
            circle.dispatchEvent = jest.fn();
        });

        describe('set clockwise', () => {
            it('should set the value of clockwise', () => {
                circle.clockwise = clockwise;
                expect(circle.config.clockwise).toEqual(clockwise);
            });

            it('should call the dispatchEvent exactly once with the correct AttributeChangedEvent', () => {
                circle.clockwise = clockwise;
                expect(circle.dispatchEvent).toHaveBeenCalledTimes(1);
                expect(circle.dispatchEvent).toHaveBeenCalledWith(new AttributeChangedEvent('clockwise', clockwise));
            });
        });

        describe('get clockwise', () => {
            it('should get the value of clockwise', () => {
                circle.config.clockwise = clockwise;
                expect(circle.clockwise).toEqual(clockwise);
            });
        });
    });

    describe('get/set isRoot', () => {
        let circle;
        const isRoot = false;

        beforeEach(() => {
            circle = new Circle();
            circle.dispatchEvent = jest.fn();
        });

        describe('set isRoot', () => {
            it('should set the value of isRoot', () => {
                circle.isRoot = isRoot;
                expect(circle.config.isRoot).toEqual(isRoot);
            });

            it('should call the dispatchEvent exactly once with the correct AttributeChangedEvent', () => {
                circle.isRoot = isRoot;
                expect(circle.dispatchEvent).toHaveBeenCalledTimes(1);
                expect(circle.dispatchEvent).toHaveBeenCalledWith(new AttributeChangedEvent('isRoot', isRoot));
            });
        });

        describe('get isRoot', () => {
            it('should get the value of isRoot', () => {
                circle.config.isRoot = isRoot;
                expect(circle.isRoot).toEqual(isRoot);
            });
        });
    });

    describe('get/set stepMod', () => {
        let circle;
        const stepMod = 12;

        beforeEach(() => {
            circle = new Circle();
            circle.dispatchEvent = jest.fn();
        });

        describe('set stepMod', () => {
            it('should set the value of stepMod', () => {
                circle.stepMod = stepMod;
                expect(circle.config.stepMod).toEqual(stepMod);
            });

            it('should call the dispatchEvent exactly once with the correct AttributeChangedEvent', () => {
                circle.stepMod = stepMod;
                expect(circle.dispatchEvent).toHaveBeenCalledTimes(1);
                expect(circle.dispatchEvent).toHaveBeenCalledWith(new AttributeChangedEvent('stepMod', stepMod));
            });
        });

        describe('get stepMod', () => {
            it('should get the value of stepMod', () => {
                circle.config.stepMod = stepMod;
                expect(circle.stepMod).toEqual(stepMod);
            });
        });
    });

    describe('get/set startAngle', () => {
        let circle;
        const startAngle = 12;

        beforeEach(() => {
            circle = new Circle();
            circle.dispatchEvent = jest.fn();
        });

        describe('set startAngle', () => {
            it('should set the value of startAngle', () => {
                circle.startAngle = startAngle;
                expect(circle.config.startAngle).toEqual(startAngle);
            });

            it('should call the dispatchEvent exactly once with the correct AttributeChangedEvent', () => {
                circle.startAngle = startAngle;
                expect(circle.dispatchEvent).toHaveBeenCalledTimes(1);
                expect(circle.dispatchEvent).toHaveBeenCalledWith(new AttributeChangedEvent('startAngle', startAngle));
            });
        });

        describe('get startAngle', () => {
            it('should get the value of startAngle', () => {
                circle.config.startAngle = startAngle;
                expect(circle.startAngle).toEqual(startAngle);
            });
        });
    });

    describe('get/set radius', () => {
        let circle;
        const radius = 9000;

        beforeEach(() => {
            circle = new Circle();
            circle.dispatchEvent = jest.fn();
        });

        describe('set radius', () => {
            it('should set the value of radius', () => {
                circle.radius = radius;
                expect(circle.config.radius).toEqual(radius);
            });

            it('should call the dispatchEvent exactly once with the correct AttributeChangedEvent', () => {
                circle.radius = radius;
                expect(circle.dispatchEvent).toHaveBeenCalledTimes(1);
                expect(circle.dispatchEvent).toHaveBeenCalledWith(new AttributeChangedEvent('radius', radius));
            });
        });

        describe('get radius', () => {
            it('should get the value of radius', () => {
                circle.config.radius = radius;
                expect(circle.radius).toEqual(radius);
            });
        });
    });

    describe('get modified', () => {
        let circle;
        const modified = true;

        beforeEach(() => {
            circle = new Circle();
            circle.config.modified = modified;
        });

        it('should get the value of modified value', () => {
            expect(circle.modified).toEqual(modified);
        });
    });
});
