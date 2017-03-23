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
