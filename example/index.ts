/**
 * @author Ajantha Bandara
 * @Date 22 Dec, 2019
 * @description - This is a IoC container for Typescipt
 */

 import { Container } from 'bilstrap-iocjs'

 export class Engine {
   constructor(private piston: Piston) {
     // tslint:disable-next-line:no-console
     console.log('initializing Engine');
   }

   public start() {
     // tslint:disable-next-line:no-console
     console.log('Stat the engine');
     this.piston.fire();
   }

   public stop() {
     // tslint:disable-next-line:no-console
     console.log('Stop the engine');
   }

   public getPiston() {
     return this.piston;
   }
 }

 // tslint:disable-next-line:max-classes-per-file
 export class Piston {
   constructor() {}

   public fire() {
     console.log('piston is firing')
   }
 }

 // tslint:disable-next-line:max-classes-per-file
 export class Car {
   constructor(private engine: Engine) {}

   public start() {
     this.engine.start();
   }

   public getEngine(): Engine {
     return this.engine;
   }
 }

 const container = new Container();

 container.register('piston', Piston, [], true);
 container.register('engine', Engine, ['piston']);
 container.register('car', Car, ['engine']);

 const BMW: any = container.get('car');
 const BENZ: any = container.get('car');
 BMW.start();
 BENZ.start();

 console.log('is same engine: ', BMW.getEngine() === BENZ.getEngine())
 console.log('is same Piston: ', BMW.getEngine().getPiston() === BENZ.getEngine().getPiston())
 