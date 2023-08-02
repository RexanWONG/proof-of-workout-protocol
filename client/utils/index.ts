export const formatBalance = (rawBalance: string) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
    return balance
}

export const convertSecondsToMinutes = (seconds: number) => {
    return seconds / 60;
}

export const computePowTokenRewards = (
    eth_staked: number,
    duration: number,
    difficulty: number
) => {
    const powTokenReward = ((eth_staked/100) * duration * (difficulty * 100))/(1000000000000000000)
    return powTokenReward;
}
  
  