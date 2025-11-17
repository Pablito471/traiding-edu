// src/components/charts/TradingViewChart.jsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createChart } from "lightweight-charts";
import Card from "../ui/Card";
import LoadingSpinner from "../ui/LoadingSpinner";

const TradingViewChart = ({
  symbol = "BTCUSDT",
  timeframe = "1h",
  onAreaSelect,
  selectedArea,
}) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const volumeSeriesRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState(null);

  // Generar datos de ejemplo más realistas
  const generateSampleData = useCallback(() => {
    const data = [];
    const volumeData = [];
    let time = new Date("2024-01-01").getTime() / 1000;
    let price = 45000; // Precio inicial BTC

    for (let i = 0; i < 200; i++) {
      const open = price;
      const change = (Math.random() - 0.5) * 800;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 200;
      const low = Math.min(open, close) - Math.random() * 200;
      const volume = 100 + Math.random() * 1000;

      data.push({
        time: time,
        open: open,
        high: high,
        low: low,
        close: close,
      });

      volumeData.push({
        time: time,
        value: volume,
        color:
          close >= open ? "rgba(16, 185, 129, 0.5)" : "rgba(239, 68, 68, 0.5)",
      });

      time += 3600;
      price = close;
    }

    return { candleData: data, volumeData };
  }, []);

  // Función para inicializar el gráfico
  const initializeChart = useCallback(async () => {
    if (!chartContainerRef.current) return;

    // Simular carga asíncrona
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Crear el chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: "#ffffff" },
        textColor: "#374151",
      },
      grid: {
        vertLines: { color: "#f3f4f6" },
        horzLines: { color: "#f3f4f6" },
      },
      crosshair: {
        mode: 1,
      },
      timeScale: {
        borderColor: "#e5e7eb",
        timeVisible: true,
      },
    });

    chartRef.current = chart;

    // Crear serie de velas
    const candleSeries = chart.addCandlestickSeries({
      upColor: "#10b981",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#10b981",
      wickDownColor: "#ef4444",
    });

    candleSeriesRef.current = candleSeries;

    // Crear serie de volumen
    const volumeSeries = chart.addHistogramSeries({
      color: "#9ca3af",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "volume",
    });

    volumeSeriesRef.current = volumeSeries;

    // Configurar escala de volumen
    chart.priceScale("volume").applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    // Cargar datos
    const { candleData, volumeData } = generateSampleData();
    candleSeries.setData(candleData);
    volumeSeries.setData(volumeData);

    return chart;
  }, [generateSampleData]);

  useEffect(() => {
    let mounted = true;
    let chart;

    const setupChart = async () => {
      try {
        chart = await initializeChart();

        if (!mounted || !chart) return;

        // Manejar redimensionamiento
        const handleResize = () => {
          if (chartContainerRef.current && chart) {
            chart.applyOptions({
              width: chartContainerRef.current.clientWidth,
            });
          }
        };

        window.addEventListener("resize", handleResize);

        // Limpiar loading después de que todo esté listo
        setTimeout(() => {
          if (mounted) {
            setLoading(false);
          }
        }, 300);

        return () => {
          window.removeEventListener("resize", handleResize);
          if (chart) {
            chart.remove();
          }
        };
      } catch (error) {
        console.error("Error inicializando gráfico:", error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    setupChart();

    return () => {
      mounted = false;
      if (chart) {
        chart.remove();
      }
    };
  }, [symbol, timeframe, initializeChart]);

  // Manejar selección de área
  useEffect(() => {
    if (!chartRef.current || !onAreaSelect) return;

    const chart = chartRef.current;
    let startTime = null;

    const handleClick = (param) => {
      if (!param.time) return;

      if (!isSelecting) {
        // Iniciar selección
        setSelectionStart(param.time);
        setIsSelecting(true);
      } else {
        // Finalizar selección
        const endTime = param.time;
        if (onAreaSelect && selectionStart && endTime) {
          const start = Math.min(selectionStart, endTime);
          const end = Math.max(selectionStart, endTime);
          onAreaSelect(start, end);
        }
        setIsSelecting(false);
        setSelectionStart(null);
      }
    };

    chart.subscribeClick(handleClick);

    return () => {
      chart.unsubscribeClick(handleClick);
    };
  }, [isSelecting, selectionStart, onAreaSelect]);

  // Mostrar área seleccionada
  useEffect(() => {
    if (!chartRef.current || !selectedArea) return;

    const chart = chartRef.current;

    // Limpiar áreas anteriores
    chart.removeAllShapes();

    // Agregar área de selección
    chart.createShape(
      { time: selectedArea.start, price: 0 },
      { time: selectedArea.end, price: 100000 },
      {
        shape: "rectangle",
        lock: true,
        disableSelection: true,
        disableSave: true,
        zOrder: "top",
        background: "rgba(59, 130, 246, 0.1)",
        border: { color: "rgba(59, 130, 246, 0.3)", width: 1 },
      }
    );
  }, [selectedArea]);

  return (
    <Card className="overflow-hidden" padding="none">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-900">{symbol}</h3>
          <span className="text-sm text-gray-600">{timeframe}</span>
        </div>
        {isSelecting && (
          <div className="flex items-center space-x-2 text-sm text-primary-600">
            <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
            <span>Selecciona el punto final del área</span>
          </div>
        )}
      </div>

      <div className="relative p-4">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10 rounded-lg">
            <div className="text-center">
              <LoadingSpinner size="large" />
              <p className="mt-2 text-gray-600">Cargando gráfico...</p>
            </div>
          </div>
        )}

        <div ref={chartContainerRef} className="w-full h-96" />

        {onAreaSelect && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700 text-center">
              💡 Haz clic en dos puntos del gráfico para seleccionar un área y
              analizarla con IA
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TradingViewChart;
