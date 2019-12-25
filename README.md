# **Bilstrap-iocjs**

## Bilstrap-iocjs is a IoC(Inversion of Controll) container for your typescript project.

## Install

``` bash
npm install bilstrap-iosjs@latest
```

## This is a simple light weight typescript library that let you to remove your hardcodes dependencies from your ES6 classes. This allow you to manage both singleton and other dependency classes.

## Oldway

```ts
class Piston {
  constructor() {}

  public fire() {
    console.log('piston is firing')
  }
}

class Engine {
   constructor(private piston: Piston) {
     console.log('initializing Engine');
     // hardcodes value
     this.piston = new Piston();
   }

   public start() {
     console.log('Stating the engine');
     this.piston.fire();
   }

   public stop() {
     console.log('Stoping the engine');
   }
 }

 class Car {
   constructor(private engine: Engine) {
     // hardcoded values
     this.engine = new Engine(new Piston());
   }

   public start() {
     this.engine.start();
   }

   public getEngine(): Engine {
     return this.engine;
   }
 }
```

## Using bilstrap-iosjs

```ts
import { Container } from 'bilstrap-iocjs';

class Piston {
  constructor() {}

  public fire() {
    console.log('piston is firing')
  }
}

class Engine {
   constructor(private piston: Piston) {
     console.log('initializing Engine');
   }

   public start() {
     console.log('Stating the engine');
     this.piston.fire();
   }

   public stop() {
     console.log('Stoping the engine');
   }
 }

 class Car {
   // you dependencies define here
   constructor(private engine: Engine) {}

   public start() {
     this.engine.start();
   }

   public getEngine(): Engine {
     return this.engine;
   }
 }

const container = new Container();
// here you register the class
container.register('piston', Piston, []);
container.register('engine', Engine, ['piston']);
container.register('car', Car, ['engine']);

const BMW: any = container.get('car');
BMW.start();
```


## Singleton classes

```ts
// singleton example
container.register('piston', Piston, [], true);

 const BMW: any = container.get('car');
 const BENZ: any = container.get('car');
 BMW.start();
 BENZ.start();

 console.log('is same engine: ', BMW.getEngine() === BENZ.getEngine()) // false
 console.log('is same Piston: ', BMW.getEngine().getPiston() === BENZ.getEngine().getPiston()) // true

```

## Descorators

On the way


## Features

**register(uniqueClassName, BaseClass, Dependencies, singletonOrNot): void**

|          Prameter      |        Description                |
|------------------------|-----------------------------------|
| name : string          | unique name to identify the class |
| definition: Class      | Class that you want to register   |
| dependencies: string[] | string array of dependencies, these are unique names that you used to register the dependencies|
| isSingleton: boolean   | default value is **false**.       |

**get(name):an y**

| Parameter    | Description |
|--------------|-------------|
| name: string | unique name of the dependency you need

## Contribution

Become a contributor to this project. Feel free to submit an issue or a pull request.
