import { Brush } from './brushes';
import { AttributeChangedEvent } from './events';

describe('Brush', () => {
    describe('constructor', () => {
        let brush;

        beforeEach(() => {
            brush = new Brush();
        });
        it('should create a valid Brush', () => {
            expect(brush).not.toBe(null);
        });

        it('should have the correct default values', () => {
            expect(brush.config.color).toBe('#FFFFFF');
            expect(brush.config.transparency).toBe(0);
            expect(brush.config.degrees).toBe(0);
            expect(brush.config.draw).toBe(true);
            expect(brush.config.link).toBe(false);
            expect(brush.config.offset).toBe(0);
            expect(brush.config.point).toBe(0.5);
        });
    });

    describe('get/set color', () => {
        let brush;
        const color = 'black';

        beforeEach(() => {
            brush = new Brush();
            brush.dispatchEvent = jest.fn();
        });

        describe('set color', () => {
            it('should set the color', () => {
                brush.color = color;
                expect(brush.config.color).toEqual(color);
            });

            it('should call the dispatchEvent exactly once with the correct AttributeChangedEvent', () => {
                brush.color = color;
                expect(brush.dispatchEvent).toHaveBeenCalledTimes(1);
                expect(brush.dispatchEvent).toHaveBeenCalledWith(new AttributeChangedEvent('color', color));
            });
        });

        describe('get color', () => {
            it('should get the color', () => {
                brush.config.color = color;
                expect(brush.color).toEqual(color);
            });
        });
    });

    describe('get/set transparency', () => {
        let brush;
        const transparency = 10;

        beforeEach(() => {
            brush = new Brush();
            brush.dispatchEvent = jest.fn();
        });

        describe('set transparency', () => {
            it('should set the transparency', () => {
                brush.transparency = transparency;
                expect(brush.config.transparency).toEqual(transparency);
            });

            it('should call the dispatchEvent exactly once with the correct AttributeChangedEvent', () => {
                brush.transparency = transparency;
                expect(brush.dispatchEvent).toHaveBeenCalledTimes(1);
                expect(brush.dispatchEvent).toHaveBeenCalledWith(new AttributeChangedEvent('transparency', transparency));
            });
        });

        describe('get transparency', () => {
            it('should get the transparency', () => {
                brush.config.transparency = transparency;
                expect(brush.transparency).toEqual(transparency);
            });
        });
    });

    describe('get/set degrees', () => {
        let brush;
        const degrees = 23;

        beforeEach(() => {
            brush = new Brush();
            brush.dispatchEvent = jest.fn();
        });

        describe('set degrees', () => {
            it('should set the degrees', () => {
                brush.degrees = degrees;
                expect(brush.config.degrees).toEqual(degrees);
            });

            it('should call the dispatchEvent exactly once with the correct AttributeChangedEvent', () => {
                brush.degrees = degrees;
                expect(brush.dispatchEvent).toHaveBeenCalledTimes(1);
                expect(brush.dispatchEvent).toHaveBeenCalledWith(new AttributeChangedEvent('degrees', degrees));
            });
        });

        describe('get degrees', () => {
            it('should get the degrees', () => {
                brush.config.degrees = degrees;
                expect(brush.degrees).toEqual(degrees);
            });
        });
    });

    describe('get/set draw', () => {
        let brush;
        const draw = false;

        beforeEach(() => {
            brush = new Brush();
            brush.dispatchEvent = jest.fn();
        });

        describe('set draw', () => {
            it('should set the draw', () => {
                brush.draw = draw;
                expect(brush.config.draw).toEqual(draw);
            });

            it('should call the dispatchEvent exactly once with the correct AttributeChangedEvent', () => {
                brush.draw = draw;
                expect(brush.dispatchEvent).toHaveBeenCalledTimes(1);
                expect(brush.dispatchEvent).toHaveBeenCalledWith(new AttributeChangedEvent('draw', draw));
            });
        });

        describe('get draw', () => {
            it('should get the draw', () => {
                brush.config.draw = draw;
                expect(brush.draw).toEqual(draw);
            });
        });
    });

    describe('get/set link', () => {
        let brush;
        const link = true;

        beforeEach(() => {
            brush = new Brush();
            brush.dispatchEvent = jest.fn();
        });

        describe('set link', () => {
            it('should set the link', () => {
                brush.link = link;
                expect(brush.config.link).toEqual(link);
            });

            it('should call the dispatchEvent exactly once with the correct AttributeChangedEvent', () => {
                brush.link = link;
                expect(brush.dispatchEvent).toHaveBeenCalledTimes(1);
                expect(brush.dispatchEvent).toHaveBeenCalledWith(new AttributeChangedEvent('link', link));
            });
        });

        describe('get link', () => {
            it('should get the link', () => {
                brush.config.link = link;
                expect(brush.link).toEqual(link);
            });
        });
    });

    describe('get/set offset', () => {
        let brush;
        const offset = 90;

        beforeEach(() => {
            brush = new Brush();
            brush.dispatchEvent = jest.fn();
        });

        describe('set offset', () => {
            it('should set the offset', () => {
                brush.offset = offset;
                expect(brush.config.offset).toEqual(offset);
            });

            it('should call the dispatchEvent exactly once with the correct AttributeChangedEvent', () => {
                brush.offset = offset;
                expect(brush.dispatchEvent).toHaveBeenCalledTimes(1);
                expect(brush.dispatchEvent).toHaveBeenCalledWith(new AttributeChangedEvent('offset', offset));
            });
        });

        describe('get offset', () => {
            it('should get the offset', () => {
                brush.config.offset = offset;
                expect(brush.offset).toEqual(offset);
            });
        });
    });

    describe('get/set point', () => {
        let brush;
        const point = 90;

        beforeEach(() => {
            brush = new Brush();
            brush.dispatchEvent = jest.fn();
        });

        describe('set point', () => {
            it('should set the point', () => {
                brush.point = point;
                expect(brush.config.point).toEqual(point);
            });

            it('should call the dispatchEvent exactly once with the correct AttributeChangedEvent', () => {
                brush.point = point;
                expect(brush.dispatchEvent).toHaveBeenCalledTimes(1);
                expect(brush.dispatchEvent).toHaveBeenCalledWith(new AttributeChangedEvent('point', point));
            });
        });

        describe('get point', () => {
            it('should get the point', () => {
                brush.config.point = point;
                expect(brush.point).toEqual(point);
            });
        });
    });

    describe('get colorWithAlpha', () => {
        let brush;
        const color = '#000000';

        beforeEach(() => {
            brush = new Brush();
            brush.config.color = color;
            brush.config.transparency = 0;
        });

        it('should return the expected colourWithAlpha value', () => {
            expect(brush.colorWithAlpha).toEqual('#000000ff');
        });
    });
});
