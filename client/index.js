import { getCompanyStockPrice } from './stockPricePromise.js';
import { getCompanyStockPriceGenerator } from './stockPriceGenerator.js';
import { genToFn } from './generatorConverter.js';

/*
 * Just a wrapper function cause I want to have a console.log before executing the getCompanyStockPrice
 */
const promiseWay = () => {
  console.log('Using Promise to getCompanyStockPrice');
  return getCompanyStockPrice('Microsoft').then(console.log);
}

/*
 * Just a wrapper function cause I want to have a console.log before executing the getCompanyStockPriceGenerator
 */

const generatorWay = () => {
  console.log('Using combination of generator convertor and generator function to getCompanyStockPrice');
  const newFn = genToFn(getCompanyStockPriceGenerator, 'Microsoft');
  return newFn().then(console.log);
}

/*
 * using generator function to sequentially execute getCompany stock price by two way
 * 1: using traditional Promise way
 * 2: using generator way which help to write asynchronous code in synchronous style code
 */
const sequentialExecution = function* () {
  yield promiseWay();
  yield generatorWay();
}

/*
 * Convert the generator function sequenceExecution to normal function. And execute the new function
 */
genToFn(sequentialExecution)();
