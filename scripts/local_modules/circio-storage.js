export default class Storage {
    constructor(engine = false, painter = false, options) {
        this.engine = engine;
        this.painter = painter;
    }

    export(encode = true) {
        let data = {};
        let image = false;

        if(this.engine !== false) {
            data.engineData = this.engine.export(false);
        }

        if(this.painter !== false) {
            image = this.painter.exportImage();
            data.painterData = this.painter.export(false);
        }

        if(encode === true) {
            data = btoa(JSON.stringify(data));
        }

        return {data: data, image: image};
    }

    store(data) {

    }
}
