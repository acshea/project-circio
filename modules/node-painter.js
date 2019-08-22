class Painter {
    constructor (engine, options) {

        if (typeof engine === "undefined") {
            throw "Please create an engine";
        }

        // Engine
        this.engine = engine;
        this.width = this.engine.width;
        this.height = this.engine.height;

        this.brushes = [];

        this.canvas = options.canvas;
        this.context = this.canvas.getContext("2d");

        this.settings = {
            draw: (typeof options.draw !== 'undefined') ? options.draw : true,
            color: (typeof options.color !== 'undefined') ? options.color : '#FFF',
            point: (typeof options.point !== 'undefined') ? options.point : 0.5,
            backgroundFill: (typeof options.backgroundFill !== 'undefined') ? options.backgroundFill : '#1b5eec'
        };
        Object.assign(this, JSON.parse(JSON.stringify(this.settings)));
        
        this.fillBackground();
    }

    fillBackground () {
        this.clearBackground();
        if(this.backgroundFill !== '') {
            this.context.beginPath();
            this.context.rect(0, 0, this.width, this.height);
            this.context.fillStyle = this.getColor(this.backgroundFill);
            this.context.fill();
        }
    }

    clearBackground () {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    addCircleBrush (circle, options) {
        if (typeof this.brushes[circle.id] === 'undefined') {
            this.brushes[circle.id] = [];
        }

        const brush = new Brush(this, options);
        this.brushes[circle.id].push(brush);
    }

    drawCircles () {
        this.engine.list.forEach(circle => {
            if (typeof this.brushes[circle.id] !== 'undefined' && this.brushes[circle.id].length > 0) {
                this.drawPoints(circle);
            }
        });
        return this;
    }

    drawPoints (circle) {
        let canvas = this.context;
        this.brushes[circle.id].forEach(brush => {
            const radians = circle.getRadians();
            const x = circle.x1 + (Math.cos(radians + (brush.degrees * (Math.PI/180))) * brush.offset);
            const y = circle.y1 + (Math.sin(radians + (brush.degrees * (Math.PI/180))) * brush.offset);
            const previousX = circle.previousX1 + (Math.cos(radians + (brush.degrees * (Math.PI/180))) * brush.offset);
            const previousY = circle.previousY1 + (Math.sin(radians + (brush.degrees * (Math.PI/180))) * brush.offset);
            const color = this.getColor(brush.color);

            if(brush.link === true) {
                canvas.strokeStyle = color;
                canvas.beginPath();
                canvas.moveTo(previousX, previousY);
                canvas.lineTo(x, y);
                canvas.lineWidth = brush.point;
                canvas.stroke();
            } else {
                canvas.fillStyle = color;
                canvas.beginPath();
                canvas.arc(x, y, brush.point, 0, 2*Math.PI);
                canvas.fill();
            }

            brush.lastPoint = {x:x, y:y};
        });
    };

    getColor (color) {
        switch (color) {
            case 'random':
                return this.getRandomColor();
                break;
            default:
                return color;
                break;
        }
    }

    getRandomColor () {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    clear () {
        this.context.clearRect(0,0,this.width, this.height);
    };

    exportPainter (encode = false) {
        const keys = Object.keys(this.settings);
        let data = keys.reduce(function(data, setting) {
            data[setting] = this[setting];

            return data;
        }.bind(this), {});

        if(encode === true) {
            return btoa(JSON.stringify(data));
        }

        return data;
    }

    exportBrushes (encode = false) {
        let data = [];
        this.brushes.forEach(function(brushes, shapeId){
            if(!Array.isArray(brushes)) {
                return;
            }

            data[shapeId] = brushes.map(brush => {
                return brush.export();
            });
        });

        if(encode === true) {
            return btoa(JSON.stringify(data));
        }

        return data;
    }

    exportImageAsDataURL () {
        const offscreen = document.createElement('canvas');
        offscreen.setAttribute('height', this.canvasArea.style.height);
        offscreen.setAttribute('width', this.canvasArea.style.width);

        const offscreenContext = offscreen.getContext("2d");

        offscreenContext.drawImage(this.background,0,0);
        offscreenContext.drawImage(this.canvas,0,0);
        return offscreen.toDataURL("image/png");
    }

    exportPathAsSaveable () {
        const win = window.open();
        win.document.write('<iframe src="' + this.canvas.toDataURL('image/png')  + '" frameborder="0" style="background:#f1f1f1; border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100vh;" allowfullscreen></iframe>');
    }

    exportImageAsSaveable () {
        const win = window.open();
        win.document.write('<iframe src="' + this.exportImageAsDataURL()  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100vh;" allowfullscreen></iframe>');
    }

    export (encode = false) {
        let data = {};
        const painterData = this.exportPainter();
        const brushesData = this.exportBrushes();

        data.painter = painterData;
        data.brushes = brushesData;

        if(encode === true) {
            return btoa(JSON.stringify(data));
        }

        return data;
    }

    import (data) {
        this.importPainter(data.painter);
        this.importBrushes(data.brushes);
    }

    importPainter (painterData) {
        Object.assign(this, painterData);
    }

    importBrushes (circleBrushesData) {
        this.brushes = [];
        circleBrushesData.forEach(function(brushesData, circleId) {
            if (Array.isArray(brushesData)) {
                brushesData.forEach(brushOptions => {
                    const circle = this.engine.list[circleId];
                    this.addCircleBrush(circle, brushOptions);
                });
            }
        }, this);
    }
}

class Brush {
    constructor (painter, options) {
        this.settings = {
            color: (typeof options.color !== 'undefined') ? options.color : painter.color,
            point: (typeof options.point !== 'undefined') ? options.point : painter.point,
            offset: (typeof options.offset !== 'undefined') ? options.offset : 0,
            degrees: (typeof options.degrees !== 'undefined') ? options.degrees : 0,
            link: (typeof options.link !== 'undefined') ? options.link : false,
        };

        Object.assign(this, JSON.parse(JSON.stringify(this.settings)));
    }

    export (encode = false) {
        const keys = Object.keys(this.settings);
        let data = keys.reduce(function(data, setting) {
            data[setting] = this[setting];

            return data;
        }.bind(this), {});

        if(encode === true) {
            return btoa(JSON.stringify(data));
        }

        return data;
    }
}

module.exports = Painter;