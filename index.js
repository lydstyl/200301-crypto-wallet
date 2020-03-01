const myAssets = {
  BTC: { balance: 2.17554857 },
  ETH: { balance: 0 },
  XRP: { balance: 10491.17282557 },
  BCH: { balance: 5.13250079 },
  LTC: { balance: 9.31198211 }
};

let totalUsdValue = 0;

fetch('https://api.coincap.io/v2/assets')
  .then(response => {
    return response.json();
  })
  .then(data => {
    data = data.data.filter(crypto =>
      Object.keys(myAssets).includes(crypto.symbol)
    );

    data.forEach(asset => {
      const symbol = asset.symbol;
      const priceUsd = parseFloat(asset.priceUsd);
      const balance = myAssets[asset.symbol].balance;
      const usdValue = priceUsd * balance;
      totalUsdValue += usdValue;
      myAssets[symbol].price = priceUsd;
      myAssets[symbol].usdValue = usdValue;
    });

    Object.keys(myAssets).forEach(asset => {
      myAssets[asset].percent = myAssets[asset].usdValue / totalUsdValue;
    });

    // console.log(myAssets);
    document.querySelector('pre').innerText = JSON.stringify(myAssets, null, 4);
  })
  .catch(err => {
    console.log(err);
  });
