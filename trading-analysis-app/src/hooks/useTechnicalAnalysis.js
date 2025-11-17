import { useState, useCallback, useRef } from "react";

// Funciones auxiliares
const detectPatterns = (data) => {
  const patterns = [];
  const prices = data.map((d) => d.close);

  if (isUptrend(prices)) {
    patterns.push({
      name: "Tendencia Alcista",
      type: "tendencia",
      strength: "media",
      description: "Máximos y mínimos crecientes",
    });
  } else if (isDowntrend(prices)) {
    patterns.push({
      name: "Tendencia Bajista",
      type: "tendencia",
      strength: "media",
      description: "Máximos y mínimos decrecientes",
    });
  }

  if (hasConsolidation(data)) {
    patterns.push({
      name: "Zona de Consolidación",
      type: "rango",
      strength: "alta",
      description: "Precio negociando en rango definido",
    });
  }

  return patterns;
};

const isUptrend = (prices) => {
  if (prices.length < 5) return false;
  const first = prices.slice(0, 3);
  const last = prices.slice(-3);
  return average(last) > average(first) * 1.02;
};

const isDowntrend = (prices) => {
  if (prices.length < 5) return false;
  const first = prices.slice(0, 3);
  const last = prices.slice(-3);
  return average(last) < average(first) * 0.98;
};

const hasConsolidation = (data) => {
  const highs = data.map((d) => d.high);
  const lows = data.map((d) => d.low);
  const range = Math.max(...highs) - Math.min(...lows);
  const avgPrice = average([...highs, ...lows]);
  return range / avgPrice < 0.03;
};

const calculateVolatility = (data) => {
  const volatilities = data.map((d) => ((d.high - d.low) / d.low) * 100);
  return average(volatilities);
};

const calculateKeyLevels = (data) => {
  const highs = data.map((d) => d.high);
  const lows = data.map((d) => d.low);
  return {
    resistance: Math.max(...highs),
    support: Math.min(...lows),
    pivot: average(data.map((d) => (d.high + d.low + d.close) / 3)),
  };
};

const generateRecommendation = (trend, patterns) => {
  if (trend === "bullish" && patterns.length > 0) return "COMPRAR";
  if (trend === "bearish" && patterns.length > 0) return "VENDER";
  return "MANTENER";
};

const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

const performAnalysis = (data) => {
  const prices = data.map((d) => d.close);
  const firstPrice = prices[0];
  const lastPrice = prices[prices.length - 1];
  const priceChange = ((lastPrice - firstPrice) / firstPrice) * 100;

  let trend = "neutral";
  if (priceChange > 2) trend = "bullish";
  else if (priceChange < -2) trend = "bearish";

  const patterns = detectPatterns(data);
  const volatility = calculateVolatility(data);

  // Cálculo determinístico de confianza
  const calculateConfidence = () => {
    let confidence = 70;
    if (data.length > 10) confidence += 10;
    if (data.length > 20) confidence += 5;
    if (volatility < 2) confidence += 5;
    if (patterns.length > 0) confidence += 10;
    if (trend !== "neutral") confidence += 5;
    return Math.min(confidence, 95);
  };

  return {
    trend,
    patterns,
    confidence: Math.round(calculateConfidence()),
    recommendation: generateRecommendation(trend, patterns),
    keyLevels: calculateKeyLevels(data),
    volatility: volatility.toFixed(2),
    priceChange: priceChange.toFixed(2),
    timeframe: `${data.length} periodos`,
  };
};

export const useTechnicalAnalysis = () => {
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const analysisRef = useRef({ performAnalysis });

  const analyzeData = useCallback(async (selectedData) => {
    if (!selectedData || selectedData.length < 3) return null;

    setAnalyzing(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        const result = analysisRef.current.performAnalysis(selectedData);
        setAnalysis(result);
        setAnalyzing(false);
        resolve(result);
      }, 1200);
    });
  }, []);

  const clearAnalysis = useCallback(() => {
    setAnalysis(null);
  }, []);

  return {
    analysis,
    analyzing,
    analyzeData,
    clearAnalysis,
  };
};
