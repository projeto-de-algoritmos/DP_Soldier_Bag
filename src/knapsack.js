export function knapsack(items, capacity) {
  const n = items.length;
  const dp = [];
  
  for (let i = 0; i <= n; i++) {
    dp[i] = [];
    for (let j = 0; j <= capacity; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 0;
      } else {
        const weight = items[i - 1].weight;
        if (weight > j) {
          dp[i][j] = dp[i - 1][j];
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight] + items[i - 1].value);
        }
      }
    }
  }

  let res = [];
  let i = n;
  let j = capacity;
  while (i > 0 && j > 0) {
    if (dp[i][j] !== dp[i - 1][j]) {
      res.push(items[i - 1]);
      j -= items[i - 1].weight;
    }
    i--;
  }

  var wtot = 0;
  for(const l of res){
    wtot += l.weight;
  }
  return { maxValue: dp[n][capacity], W: wtot, subset: res.reverse() };
}
