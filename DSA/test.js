const currValues = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  }
  
  function checkCashRegister(price, cash, cid) {
    let change = cash - price;
    let obj = cid.reduce((acc, item) => {
      acc.total += item[1];
      acc[item[0]] = item[1];
      return acc;
    },
      {
        total: 0
      });
  
    if (obj.total === change) {
      return {
        status: 'CLOSED',
        change: cid
      }
    }
    if (obj.total < change) {
      return {
        status: 'INSUFFICIENT_FUNDS',
        change: []
      }
    }
    let chArr = [];
    cid.sort((a,b) => currValues[b[0]] - currValues[a[0]])
    for (let item of cid) {
      if (change > 0 && change % currValues[item[0]] === 0) {
        if (obj[item[0]] < change) {
          return {
            status: 'INSUFFICIENT_FUNDS',
            change: []
          }
        }
        let denom = Math.round(change / currValues[item[0]]);
        obj[item[0]] = obj[item[0]] - currValues[item[0]] * denom;
        chArr.push([item[0], currValues[item[0]] * denom]);
        change = change - currValues[item[0]] * denom;
      }
    }
    return {
      status:'OPEN',
      change:chArr
    };
  }
  
  var res = checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
  
  console.log(res)
  