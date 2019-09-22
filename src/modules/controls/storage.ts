import {
    CircInterface,
    CircStoreInterface,
    ControlInterface,
    EngineInterface,
    QuickControlInterface
} from "../../structure";
import Engine from "../engine";
import Painter from "../painter";
import BackgroundPainter from "../backgroundPainter";

export default class StorageControl implements ControlInterface, QuickControlInterface {
    protected store: CircStoreInterface;
    protected engine: EngineInterface;

    constructor(store: CircStoreInterface, engine: EngineInterface) {
        this.store = store;
        this.engine = engine;
    }

    public render(): DocumentFragment {

        const engineFragment = document.createDocumentFragment();

        return engineFragment;
    }

    protected makeSaveFragment(): DocumentFragment {
        const html = `<button class="save">Save</button>`;

        const fragment = document.createRange().createContextualFragment(html);

        fragment.querySelector('button.save').addEventListener('click', e => {
            const name = prompt('Enter Circ name');
            const circ = this.engine.export();
            circ.name = name;

            this.store.store(name, circ);
        });

        return fragment;
    }

    protected makeLoadFragment(): DocumentFragment {
        const html = `<button class="load">Load</button>`;

        const fragment = document.createRange().createContextualFragment(html);

        fragment.querySelector('button.load').addEventListener('click', e => {
            const storeFront = <HTMLElement>document.querySelector('.store');
            const storeListing = storeFront.querySelector('.listing');
            storeListing.innerHTML = '';

            this.store.list().forEach((circ: CircInterface) => {
                const tile = document.createRange().createContextualFragment(`<div class="circ" data-name="${circ.name}"><canvas class="canvasBack"></canvas><canvas class="canvasCirc"></canvas><div class="circName">${circ.name}</div></div>`);

                const tileCanvas = <HTMLCanvasElement>tile.querySelector('canvas.canvasCirc');
                tileCanvas.style.transformOrigin = '0 0'; //scale from top left
                tileCanvas.style.transform = 'scale(' + 200 / circ.height + ')';
                tileCanvas.style.width = circ.width + 'px';
                tileCanvas.style.height = circ.height + 'px';
                tileCanvas.setAttribute('height', tileCanvas.style.height);
                tileCanvas.setAttribute('width', tileCanvas.style.width);
                const tileBackCanvas = <HTMLCanvasElement>tile.querySelector('canvas.canvasBack');
                tileBackCanvas.style.transformOrigin = '0 0'; //scale from top left
                tileBackCanvas.style.transform = 'scale(' + 200 / circ.height + ')';
                tileBackCanvas.style.width = circ.width + 'px';
                tileBackCanvas.style.height = circ.height + 'px';
                tileBackCanvas.setAttribute('height', tileBackCanvas.style.height);
                tileBackCanvas.setAttribute('width', tileBackCanvas.style.width);

                const previewPainter = new Painter(tileCanvas.getContext('2d'));
                const previewBackgroundPainter = new BackgroundPainter(tileBackCanvas.getContext('2d'));
                const previewEngine = new Engine();
                previewEngine.addStepCallback(circ => previewPainter.draw(circ));
                previewEngine.addStepCallback(circ => previewBackgroundPainter.draw(circ));
                previewEngine.import(circ);

                tile.querySelector('.circ').addEventListener('click', e => {
                    this.engine.import(this.store.get((e.target as HTMLElement).closest('[data-name]').getAttribute('data-name')));
                    storeFront.style.display = 'none';
                });

                tile.querySelector('.circ').addEventListener('mouseenter', e => {
                    previewEngine.play()
                });

                tile.querySelector('.circ').addEventListener('mouseleave', e => {
                    previewEngine.pause()
                });


                storeListing.appendChild(tile);
            });

            storeFront.style.display = 'block';
        });

        return fragment;
    }

    public getQuickControls(): ControlInterface[] {
        const self = this;

        return [
            new class implements ControlInterface {
                render(): DocumentFragment {
                    return self.makeSaveFragment();
                }
            },
            new class implements ControlInterface {
                render(): DocumentFragment {
                    return self.makeLoadFragment();
                }
            },
        ];
    }

}
