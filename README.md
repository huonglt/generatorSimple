## About this app

A nodejs app to show 2 interesting usage of generator function introduced in ES6. Again, write your own code, no external library. Just Node & Babel
- 1. Writing asynchronous code in synchronous style
- 2. Running promises sequentially

- I used redux-saga in one of my projects to handle back-end promise calls. And I like the way the library helps me to write asynchronous code but in synchronous style. Yes you still can gain the same outcome by using Promise but Promise introduces so many .then, while coding in generator function way helps understand the logic much better.
- Also you can use generator function to sequentially executing multiple promises which depends on the outcome of each other.
- The function that helps me achieve these 2 things is genToFn function. It is a function that takes in a generator function, and return a normal function, where all the logic of handling the generator iterator is wrapped inside

## Promise way vs Generator way

- The promise way to get company stock price with input of company name
```
const getCompanyStockPrice = (companyName) => {
  return new Promise((resolve, reject) => {
    getCompanyQuote(companyName)
      .then(companyQuote => getStockPrice(companyQuote))
      .then(stockPrice => resolve(stockPrice));
  })
}
```

- The Generator way to get company stock price with input of company name. For me, it's easier to understand code!!!
```
const getCompanyStockPriceGenerator = function* (companyName) {
  const companyQuote = yield getCompanyQuote(companyName);
  const stockPrice = yield getStockPrice(companyQuote);
  return stockPrice;
}
```
## The function that does the trick
```
const genToFn = (generatorFn, ...args) => {
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

```
## How to use
- Write any generator function that performs the logic as you like to
- Call the genToFn function, passing in the generator function, then you got it

```
// convert the generator function, got a new function, execute the new function. You got a promise here.
genToFn(getCompanyStockPriceGenerator, 'Microsoft')();

```
## Prerequisite
  node & yarn preinstalled

  - brew install node
  - brew install yarn

  I'm using node v7.5.0, yarn v0.20.3

## Install dependencies before you start
  yarn install

## To start
  yarn start

## Things I learnt
- using ES6 generator function
- yield keyword
