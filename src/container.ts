/**
 * @author Ajantha Bandara
 * @Date 22 Dec, 2019
 * @description - This is a IoC container for Typescipt
 */

export interface IServiceType<T> {
  definition: T;
  dependencies: string[];
  isSingleton?: boolean;
  name: string | symbol;
}

export class Container {
  private serviceMap = new Map<string | symbol, IServiceType<any>>();
  private singletonMap = new Map<string | symbol, any>();

  constructor() {
    // tslint:disable-next-line:no-console
    console.log('initializing IoC container');
  }

  public register(name: string | symbol, definition: any, dependencies: any[], isSingleton = false) {
    this.serviceMap.set(name, { definition, dependencies, isSingleton, name });
  }

  public get(name: string | symbol): any {
    const service = this.serviceMap.get(name);

    if (service && this.isClass(service.definition)) {
      // class
      if (service.isSingleton) {
        let singletonInstance = this.singletonMap.get(service.name);
        if (!singletonInstance) {
          singletonInstance = this.createInstance(service);
          this.singletonMap.set(service.name, singletonInstance);
        }
        return singletonInstance;
      }
      return this.createInstance(service);
    } else {
      return service;
    }
  }

  private resolveDependencies<T>(service: IServiceType<T>): T[] {
    let dependencies: T[] = [];
    if (service.dependencies) {
      dependencies = service.dependencies.map((dep: any) => {
        return this.get(dep);
      });
    }
    return dependencies;
  }

  private createInstance(service: IServiceType<any>) {
    return new service.definition(...this.resolveDependencies(service));
  }

  private isClass = (c: any) => typeof c === 'function';
}
