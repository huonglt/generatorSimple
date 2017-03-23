export const getCompanyQuote = (companyName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('MST'), 500);
  })
}

export const getStockPrice = (companyQuote) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(12), 500);
  });
}

const getCompanyStockPrice = (companyName) => {
  return new Promise((resolve, reject) => {
    getCompanyQuote(companyName)
      .then(companyQuote => getStockPrice(companyQuote))
      .then(stockPrice => resolve(stockPrice));
  })
}
