// src/lib/settings.js
export const APP_CONFIG = {
  name: "TradingAnalyst",
  version: "1.0.0",
  description: "Professional Trading Analysis Platform",
};

export const CHART_CONFIG = {
  timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
  defaultTimeframe: "1h",
  colors: {
    bullish: "#10b981",
    bearish: "#ef4444",
    neutral: "#6b7280",
    volume: "#9ca3af",
  },
};
