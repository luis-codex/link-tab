/// <reference types="vite/client" />


/**
 * Removes the promise wrapper from a type.
 * @template T The type to remove the promise wrapper from.
 * @param {T} The type to remove the promise wrapper from.
 * @returns {RemovePromise<T>} The type without the promise wrapper.
 */
declare type RemovePromise<T> = T extends Promise<infer U> ? U : T;


/**
 * Type alias that represents a prettified version of an object.
 * @template T - The type of the object to prettify.
 */
declare type Prettify<T> = {
    [ K in keyof T ]: T[ K ];
    // eslint-disable-next-line @typescript-eslint/ban-types
} & {};