import { useState, useEffect, useCallback } from "react";

export const useChartData = (timeframe = "1h") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateSampleData = useCallback(() => {
    const basePrice = 100;
    const dataPoints = 50;
    const newData = [];

    for (let i = 0; i < dataPoints; i++) {
      const open = i === 0 ? basePrice : newData[i - 1].close;
      const volatility = 2 + Math.random() * 3;
      const change = (Math.random() - 0.5) * volatility;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 1.5;
      const low = Math.min(open, close) - Math.random() * 1.5;
      const volume = 1000 + Math.random() * 2000;

      newData.push({
        time: `${i + 9}:00`,
        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        close: Number(close.toFixed(2)),
        volume: Math.floor(volume),
        index: i,
      });
    }

    return newData;
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      if (!mounted) return;

      setLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (!mounted) return;

        const sampleData = generateSampleData();
        setData(sampleData);
      } catch (error) {
        console.error("Error cargando datos del gráfico:", error);
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
  }, [timeframe, generateSampleData]);

  return { data, loading };
};
