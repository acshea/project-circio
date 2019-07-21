export default class Storage {
    constructor(engine = false, painter = false, controls = false) {
        this.engine = engine;
        this.painter = painter;
        this.controls = controls;
    }

    export(encode = false) {
        let data = {};
        let image = false;

        if(this.engine !== false) {
            data.engineData = this.engine.export(false);
        }

        if(this.painter !== false) {
            data.painterData = this.painter.export(false);
        }

        if(encode === true) {
            data = btoa(JSON.stringify(data));
        }

        return data;
    }

    import(data, decode = false) {
        if(decode === true) {
            data = atob(data);
        }

        const importData = JSON.parse(data);

        if(this.engine !== false) {
            this.engine.import(importData.engineData);
        }

        if(this.painter !== false) {
            this.painter.import(importData.painterData);
        }

        if(this.controls !== false) {
            this.controls.controlLocation.innerHTML = "";
            this.controls.showActions();
            this.controls.showControls();
        }
    }

    store(name) {
        if(typeof name !== 'string') {
            throw 'Provide a valid name';
        }

        const key = `store.${name}`;
        const data = JSON.stringify(this.export());
        window.localStorage.setItem(key, data);

        return key;
    }

    load(name) {
        if(typeof name !== 'string') {
            throw 'Provide a valid name';
        }

        const key = `store.${name}`;
        const data = window.localStorage.getItem(key);

        if (data === null) {
            throw 'No data found';
        }

        this.import(data);
    }

    loadIndex(index) {
        if(typeof index !== 'number') {
            throw 'Provide a valid index';
        }
        const list = this.list();
        const key = list[index];
        const data = window.localStorage.getItem(key);

        if (data === null) {
            throw 'No data found';
        }

        this.import(data);

        return key;
    }

    list() {
        let keys = Object.keys(localStorage);
        keys = keys.filter(key => {
            return key.startsWith('store.');
        });

        return keys;
    }

    get(name) {
        const key = `store.${name}`;
        return window.localStorage.getItem(key);
    }
}