// src/components/charts/TradingChart.jsx
"use client";

import { useState, useCallback } from "react";
import TradingViewChart from "./TradingViewChart";
import { useTechnicalAnalysis } from "@/hooks/useTechnicalAnalysis";
import ChartControls from "./ChartControls";
import AnalysisResult from "../analysis/AnalysisResult";

const TradingChart = () => {
  const [timeframe, setTimeframe] = useState("1h");
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [selectedArea, setSelectedArea] = useState(null);

  const { analysis, analyzing, analyzeData, clearAnalysis } =
    useTechnicalAnalysis();

  const handleAreaSelect = useCallback(
    async (startTime, endTime) => {
      setSelectedArea({ start: startTime, end: endTime });

      // Simular datos seleccionados para análisis
      const mockSelectedData = [
        {
          time: startTime,
          open: 45000,
          high: 45500,
          low: 44800,
          close: 45200,
          volume: 1000,
        },
        {
          time: startTime + 3600,
          open: 45200,
          high: 45800,
          low: 45000,
          close: 45600,
          volume: 1200,
        },
        {
          time: startTime + 7200,
          open: 45600,
          high: 46000,
          low: 45400,
          close: 45800,
          volume: 900,
        },
        {
          time: startTime + 10800,
          open: 45800,
          high: 46200,
          low: 45600,
          close: 46000,
          volume: 1100,
        },
        {
          time: endTime,
          open: 46000,
          high: 46500,
          low: 45800,
          close: 46300,
          volume: 1300,
        },
      ].map((item, index) => ({ ...item, index }));

      await analyzeData(mockSelectedData);
    },
    [analyzeData]
  );

  const handleClearSelection = () => {
    setSelectedArea(null);
    clearAnalysis();
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    handleClearSelection();
  };

  const handleSymbolChange = (newSymbol) => {
    setSymbol(newSymbol);
    handleClearSelection();
  };

  return (
    <div className="space-y-6">
      <TradingViewChart
        symbol={symbol}
        timeframe={timeframe}
        onAreaSelect={handleAreaSelect}
        selectedArea={selectedArea}
      />

      {analyzing && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-700">Analizando patrón con IA...</span>
          </div>
        </div>
      )}

      {analysis && (
        <AnalysisResult analysis={analysis} onClear={handleClearSelection} />
      )}
    </div>
  );
};

export default TradingChart;
