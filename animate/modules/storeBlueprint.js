"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var circ_1 = require("./circ");
var circle_1 = require("./circle");
var brushes_1 = require("./brushes");
var BlueprintStore = /** @class */ (function () {
    function BlueprintStore() {
        this.blueprintsStore = {
            'twoCircles': this.makeTwoCircles,
            'threeCircles': this.makeThreeCircles,
            'fourCircles': this.makeFourCircles,
        };
        this.name = 'Blueprints';
    }
    BlueprintStore.prototype.get = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.resolveCirc(name));
        });
    };
    BlueprintStore.prototype.getIndex = function (index) {
        return new Promise(function (resolve, reject) {
            resolve(undefined);
        });
    };
    BlueprintStore.prototype.list = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var circs = [];
            for (var circName in _this.blueprintsStore) {
                circs.push(_this.resolveCirc(circName));
            }
            resolve(circs);
        });
    };
    BlueprintStore.prototype.resolveCirc = function (circName) {
        var circ = this.blueprintsStore[circName]();
        circ.name = circName;
        return circ;
    };
    BlueprintStore.prototype.store = function (name, circ) {
    };
    BlueprintStore.prototype.delete = function (name) {
        throw new Error("Blueprints can't be deleted.");
    };
    BlueprintStore.prototype.makeTwoCircles = function () {
        var circ = new circ_1.Circ;
        circ.width = 1080;
        circ.height = 1080;
        circ.backgroundFill = '#1b5eec';
        var circle0 = new circle_1.Circle();
        circle0.steps = 500;
        circle0.clockwise = false;
        circle0.radius = 300;
        var circle1 = new circle_1.Circle();
        circle1.steps = 500;
        circle1.radius = 100;
        var circle1Brush = new brushes_1.Brush();
        circle1.addBrush(circle1Brush);
        circ.addShape(circle0);
        circ.addShape(circle1);
        return circ;
    };
    BlueprintStore.prototype.makeThreeCircles = function () {
        var circ = new circ_1.Circ;
        circ.width = 1080;
        circ.height = 1080;
        circ.backgroundFill = '#1b5eec';
        var circle0 = new circle_1.Circle();
        circle0.steps = 500;
        circle0.clockwise = false;
        circle0.radius = 100;
        var circle1 = new circle_1.Circle();
        circle1.steps = 500;
        circle1.radius = 50;
        var circle2 = new circle_1.Circle();
        circle2.steps = 500;
        circle2.clockwise = false;
        circle2.radius = 25;
        var circle2Brush = new brushes_1.Brush();
        circle2.addBrush(circle2Brush);
        circ.addShape(circle0);
        circ.addShape(circle1);
        circ.addShape(circle2);
        return circ;
    };
    BlueprintStore.prototype.makeFourCircles = function () {
        var circ = new circ_1.Circ;
        circ.width = 1080;
        circ.height = 1080;
        circ.backgroundFill = '#1b5eec';
        var circle0 = new circle_1.Circle();
        circle0.steps = 1000;
        circle0.outside = false;
        circle0.clockwise = false;
        circle0.radius = 120;
        var circle1 = new circle_1.Circle();
        circle1.steps = 500;
        circle1.radius = 60;
        var circle2 = new circle_1.Circle();
        circle2.steps = 250;
        circle2.clockwise = false;
        circle2.radius = 30;
        var circle3 = new circle_1.Circle();
        circle3.steps = 125;
        circle3.radius = 15;
        var circle3Brush = new brushes_1.Brush();
        circle3.addBrush(circle3Brush);
        circ.addShape(circle0);
        circ.addShape(circle1);
        circ.addShape(circle2);
        circ.addShape(circle3);
        return circ;
    };
    return BlueprintStore;
}());
exports.BlueprintStore = BlueprintStore;
