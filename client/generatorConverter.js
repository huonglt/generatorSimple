/*
 * This is where all the heavy lifting resides
 * This function transform a generator function, to a normal function which when executes
 * will iterate through the original generator.
 * This explains why statements inside the generator function are all asynchronous but written in synchronous way
 * I prefer to use generator function over the traditional promise way with so many .then
 * Just execute this function over a generator, then you can gain the same outcome as in the promise way
 */
export const genToFn = (generatorFn, ...args) => {
  return () => {
    const iterator = generatorFn(...args);
    return new Promise((resolve, reject) => {
      const handleResult = (lastPromiseResult) => {
        let { value, done} = iterator.next(lastPromiseResult);
        if(done) {
          resolve(value);
        } else if(value instanceof Promise) {
          value.then(promiseResult => handleResult(promiseResult));
        } else {
          handleResult(value);
        }
      }
      handleResult();
    });
  }
}
