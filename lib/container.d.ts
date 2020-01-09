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
export declare class Container {
    private serviceMap;
    private singletonMap;
    constructor();
    register(name: string | symbol, definition: any, dependencies: any[], isSingleton?: boolean): void;
    get(name: string | symbol): any;
    private resolveDependencies;
    private createInstance;
    private isClass;
}
