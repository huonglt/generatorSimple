import { getCompanyQuote, getStockPrice } from './promises.js';
import { genToFn } from './generatorConverter.js';

export const getCompanyStockPriceGenerator = function* (companyName) {
  const companyQuote = yield getCompanyQuote(companyName);
  const stockPrice = yield getStockPrice(companyQuote);
  return stockPrice;
}
