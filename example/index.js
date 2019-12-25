"use strict";
/**
 * @author Ajantha Bandara
 * @Date 22 Dec, 2019
 * @description - This is a IoC container for Typescipt
 */
exports.__esModule = true;
var lib_1 = require("../lib");
var Engine = /** @class */ (function () {
    function Engine(piston) {
        this.piston = piston;
        // tslint:disable-next-line:no-console
        console.log('initializing Engine');
    }
    Engine.prototype.start = function () {
        // tslint:disable-next-line:no-console
        console.log('Stat the engine');
        this.piston.fire();
    };
    Engine.prototype.stop = function () {
        // tslint:disable-next-line:no-console
        console.log('Stop the engine');
    };
    Engine.prototype.getPiston = function () {
        return this.piston;
    };
    return Engine;
}());
exports.Engine = Engine;
// tslint:disable-next-line:max-classes-per-file
var Piston = /** @class */ (function () {
    function Piston() {
    }
    Piston.prototype.fire = function () {
        console.log('piston is firing');
    };
    return Piston;
}());
exports.Piston = Piston;
// tslint:disable-next-line:max-classes-per-file
var Car = /** @class */ (function () {
    function Car(engine) {
        this.engine = engine;
    }
    Car.prototype.start = function () {
        this.engine.start();
    };
    Car.prototype.getEngine = function () {
        return this.engine;
    };
    return Car;
}());
exports.Car = Car;
var container = new lib_1.Container();
container.register('piston', Piston, [], true);
container.register('engine', Engine, ['piston']);
container.register('car', Car, ['engine']);
var BMW = container.get('car');
var BENZ = container.get('car');
BMW.start();
BENZ.start();
console.log('is same engine: ', BMW.getEngine() === BENZ.getEngine());
console.log('is same Piston: ', BMW.getEngine().getPiston() === BENZ.getEngine().getPiston());
