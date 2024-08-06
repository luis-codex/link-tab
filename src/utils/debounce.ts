/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-explicit-any */

type AnyFunction = (...arguments_: readonly any[]) => unknown;
interface DebouncedFunction<F extends AnyFunction> {
    (...arguments_: Parameters<F>): ReturnType<F> | undefined;
    clear(): void;
    flush(): void;
}

interface DebounceFunction {
    <F extends AnyFunction>(function_: F, wait?: number, options?: { immediate: boolean }): DebouncedFunction<F>;
}

/**
 * Creates a debounced function that delays invoking the provided function until after `wait` milliseconds have elapsed since the last time it was invoked.
 * If `immediate` is `true`, the function will be invoked immediately on the leading edge instead of the trailing edge.
 *
 * @param function_ - The function to debounce.
 * @param wait - The number of milliseconds to delay.
 * @param options - The options object.
 * @param options.immediate - If `true`, the function will be invoked immediately on the leading edge.
 * @returns A debounced function.
 * @throws {TypeError} If the first parameter is not a function.
 * @throws {RangeError} If `wait` is negative.
 */
const debounce: DebounceFunction = function (function_: AnyFunction, wait = 100, options: { immediate: boolean } = { immediate: false }) {
    if (typeof function_ !== 'function') {
        throw new TypeError(`Expected the first parameter to be a function, got \`${typeof function_}\`.`);
    }

    if (wait < 0) {
        throw new RangeError('`wait` must not be negative.');
    }

    // TODO: Deprecate the boolean parameter at some point.
    const { immediate } = options;

    let storedContext: any;
    let storedArguments: any[];
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let timestamp: number;
    let result: any;

    function later() {
        const last = Date.now() - timestamp;

        if (last < wait && last >= 0) {
            timeoutId = setTimeout(later, wait - last);
        } else {
            timeoutId = undefined;

            if (!immediate) {
                const callContext = storedContext;
                const callArguments = storedArguments;
                storedContext = undefined;
                storedArguments = undefined as any;
                result = function_.apply(callContext, callArguments);
            }
        }
    }

    const debounced: DebouncedFunction<AnyFunction> = function (this: any, ...arguments_: any[]) {
        if (storedContext && this !== storedContext) {
            throw new Error('Debounced method called with different contexts.');
        }

        storedContext = this;
        storedArguments = arguments_;
        timestamp = Date.now();

        const callNow = immediate && !timeoutId;

        if (!timeoutId) {
            timeoutId = setTimeout(later, wait);
        }

        if (callNow) {
            const callContext = storedContext;
            const callArguments = storedArguments;
            storedContext = undefined;
            storedArguments = undefined as any;
            result = function_.apply(callContext, callArguments);
        }

        return result;
    };

    debounced.clear = () => {
        if (!timeoutId) {
            return;
        }

        clearTimeout(timeoutId);
        timeoutId = undefined;
    };

    debounced.flush = () => {
        if (!timeoutId) {
            return;
        }

        const callContext = storedContext;
        const callArguments = storedArguments;
        storedContext = undefined;
        storedArguments = undefined as any;
        result = function_.apply(callContext, callArguments);

        clearTimeout(timeoutId);
        timeoutId = undefined;
    };

    return debounced;
};


export default debounce;