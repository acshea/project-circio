/** Data **/

interface PositionInterface {
    x: number;
    y: number;
}

interface CircInterface extends EventEmitterInterface {
    name: string;
    width: number;
    height: number;
    backgroundFill: string;
    stepsToComplete: number;
    state: CircStateInterface;

    addShape(shape: ShapeInterface): void;
    removeShape(id: number): void;
    getShapes(): ShapeInterface[];
}

interface CircStateInterface {
    totalSteps: number;
}

interface ShapeInterface {
    id: number;
    steps: number;
    outside: boolean;
    fixed: boolean;
    clockwise: boolean;
    stepMod: number;
    startAngle: number;
    brushes: BrushInterface[];
    state: ShapeStateInterface;
    isRoot: boolean;

    calculatePosition(parentCircle: ShapeInterface|null): void;
    calculateAngle(): void;
    reset(): void;
}

interface ShapeStateInterface {
    totalAngle: number;
    centre: PositionInterface;
    drawPoint: PositionInterface;
    initialState: ShapeStateInterface;
    previousState: ShapeStateInterface;

    getAngle(): number;
}

interface CircleInterface extends ShapeInterface, EventEmitterInterface {
    radius: number;
}

interface BrushInterface {
    draw: boolean;
    color: string;
    transparency: number;
    point: number;
    offset: number;
    degrees: number;
    link: boolean;
}

/** Engine **/

interface EngineInterface extends EventEmitterInterface {
    import(circ: CircInterface): void;
    export(): CircInterface;

    addStepCallback(callback: CallableFunction): void
    addResetCallback(callback: CallableFunction): void
    addImportCallback(callback: CallableFunction): void
    pause(): void;
    play(count?: number|null): void
    stepFast(count: number): void
    step(): void;
    reset(): void
    isPlaying(): boolean;
    getRemainingStepsToRun(): number;
    setStepInterval(milliseconds: number): void;
    getStepInterval(): number;
}


/** Paint **/

interface PainterInterface {
    draw(circ: CircInterface): void;
    clear(): void;
    exportImageAsDataURL(): string;
}

interface CirclePainterInterface extends PainterInterface {}
interface GuidePainterInterface extends PainterInterface {
    hide(): void;
    show(): void;
    isVisible(): boolean;
}
interface BackgroundPainterInterface extends PainterInterface {}


/** Store
 *
 * The idea is that you can have multiple stores:
 *
 * class LocalStorage implements CircStore {...}
 * class CloudStorage implements CircStore {...}
 *
**/

interface CircStoreInterface {
    get(name: string): Promise<CircInterface>
    getIndex(index: number): Promise<CircInterface>
    list(): Promise<CircInterface[]>;
    store(name: string, circ: CircInterface): void;
    delete(name: string): void;
}

// interface BluePrints extends CircStoreInterface {}

/** Util **/
interface SerializerInterface {
    serialize(circ: CircInterface): string;
    unserialize(circJson: string): CircInterface;
}

/** Controls **/
interface ControlPanelInterface {
    addControl(control: ControlInterface): void;
    render(): DocumentFragment;
}

interface ControlInterface {
    render(): DocumentFragment;
}

interface QuickControlInterface {
    getQuickControls(): ControlInterface[];
}


interface CircControlInterface extends ControlInterface {}

interface ShapeControlInterface extends ControlInterface {}

interface EngineControlInterface extends ControlInterface {
    addCircControl(circControl: CircControlInterface): void;
}
interface CircleControlInterface extends ShapeControlInterface {
    addBrushControl(brush: BrushControlInterface): void;
}
interface BrushControlInterface extends ControlInterface {}
interface BackgroundControlInterface extends ControlInterface {}


/** Events **/

interface EventInterface {
    getName(): string;
    getContext(): any[];
}

interface EventEmitterInterface {
    dispatchEvent(event: EventInterface): void;
    addEventListener(eventName: string, callback: Function): void;
    addEventListeners(eventNames: string[], callback: Function): void;
}

abstract class EventEmitter implements EventEmitterInterface {
    protected events: {[name: string]: Function[]} = {};

    dispatchEvent(event: EventInterface): void {
        if (typeof this.events[event.getName()] === 'undefined') {
            this.events[event.getName()] = [];
        }

        let compoundEventNameList = event.getName().split('.');

        while (compoundEventNameList.length > 0) {
            const eventName = compoundEventNameList.join('.');
            const callbackArray = this.events[eventName] || [];

            callbackArray
                .forEach((callback: Function) => {
                    callback(...event.getContext());
                });

            compoundEventNameList.splice(-1,1);
        }
    }

    addEventListener(eventName: string, callback: Function): void {
        if (typeof this.events[eventName] === 'undefined') {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    addEventListeners(eventNames: string[], callback: Function): void {
        eventNames.forEach((name: string) => this.addEventListener(name, callback));
    }
}


interface CircStructureChangedEventInterface extends EventInterface {}
interface AttributeChangedEventInterface extends EventInterface {
    name: string;
    value: string|number|boolean;
}

export {
    PositionInterface,
    CircInterface,
    CircStateInterface,
    ShapeInterface,
    ShapeStateInterface,
    CircleInterface,
    BrushInterface,
    EngineInterface,
    PainterInterface,
    CircStoreInterface,
    CirclePainterInterface,
    GuidePainterInterface,
    BackgroundPainterInterface,
    SerializerInterface,
    ControlPanelInterface,
    ControlInterface,
    QuickControlInterface,
    ShapeControlInterface,
    EngineControlInterface,
    CircleControlInterface,
    BrushControlInterface,
    CircControlInterface,
    BackgroundControlInterface,
    EventEmitter,
    EventEmitterInterface,
    EventInterface,
    AttributeChangedEventInterface,
}




/** Load & Run Example **/

// const circPainter = new CirclePainter();
// const guidePainter = new GuidePainter();
// const engine = new Engine();
// const store = new LocalStorage();
// const circ = store.get('circ');
//
// engine.import(circ);
// engine.addCallback(circ => circPainter.draw(circ));
// engine.addCallback(circ => guidePainter.draw(circ));
// engine.run();

