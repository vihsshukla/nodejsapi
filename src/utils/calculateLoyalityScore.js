const calculateLoyalityScore = (transactionCount,totalAmount) => {
  return (60*transactionCount + 40*totalAmount)%10;
}

module.exports= calculateLoyalityScore;
