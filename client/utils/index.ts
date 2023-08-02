export const formatBalance = (rawBalance: string) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
    return balance
}

export const convertSecondsToMinutes = (seconds: number) => {
    return seconds / 60;
}

export const etherToWei = (etherAmount: number) => {
    const weiPerEther = 1000000000000000000; // 1 ether = 10^18 wei
    const weiAmount = etherAmount * weiPerEther;
    return weiAmount;
}
  
  