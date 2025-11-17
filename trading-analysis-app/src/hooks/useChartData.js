// src/hooks/useChartData.js
import { useState, useEffect, useCallback } from "react";

export const useChartData = (symbol = "BTCUSDT", timeframe = "1h") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateSampleData = useCallback(() => {
    const dataPoints = 100;
    const newData = [];
    let time = Math.floor(Date.now() / 1000) - dataPoints * 3600;
    let price = 45000;

    for (let i = 0; i < dataPoints; i++) {
      const open = price;
      const volatility = 2 + Math.random() * 3;
      const change = (Math.random() - 0.5) * volatility * 100;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 200;
      const low = Math.min(open, close) - Math.random() * 200;
      const volume = 1000 + Math.random() * 2000;

      newData.push({
        time: time + i * 3600,
        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        close: Number(close.toFixed(2)),
        volume: Math.floor(volume),
      });

      price = close;
    }

    return newData;
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      if (!mounted) return;

      setLoading(true);

      try {
        // Simular llamada a API
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (!mounted) return;

        const sampleData = generateSampleData();
        setData(sampleData);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [symbol, timeframe, generateSampleData]);

  return { data, loading };
};
