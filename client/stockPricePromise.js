import { getCompanyQuote, getStockPrice } from './promises.js';

export const getCompanyStockPrice = (companyName) => {
  return new Promise((resolve, reject) => {
    getCompanyQuote(companyName)
      .then(companyQuote => getStockPrice(companyQuote))
      .then(stockPrice => resolve(stockPrice));
  })
}
