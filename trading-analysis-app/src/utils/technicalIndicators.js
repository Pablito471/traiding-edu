// src/utils/technicalIndicators.js
export const calculateSMA = (data, period = 20) => {
  if (data.length < period) return data.map(() => null);

  return data.map((_, index) => {
    if (index < period - 1) return null;
    const slice = data.slice(index - period + 1, index + 1);
    const sum = slice.reduce((acc, curr) => acc + curr.close, 0);
    return sum / period;
  });
};

export const calculateRSI = (data, period = 14) => {
  if (data.length <= period) return data.map(() => 50);

  const gains = [];
  const losses = [];

  // Calcular cambios
  for (let i = 1; i < data.length; i++) {
    const change = data[i].close - data[i - 1].close;
    gains.push(change > 0 ? change : 0);
    losses.push(change < 0 ? Math.abs(change) : 0);
  }

  // Calcular RSI
  const rsi = [];
  for (let i = period; i < gains.length; i++) {
    const avgGain =
      gains.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
    const avgLoss =
      losses.slice(i - period, i).reduce((a, b) => a + b, 0) / period;

    if (avgLoss === 0) {
      rsi.push(100);
    } else {
      const rs = avgGain / avgLoss;
      rsi.push(100 - 100 / (1 + rs));
    }
  }

  // Rellenar con valores nulos al inicio
  return [...Array(period).fill(null), ...rsi];
};
