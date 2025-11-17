"use client";

import { useState, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";
import { useChartData } from "@/hooks/useChartData";
import { useTechnicalAnalysis } from "@/hooks/useTechnicalAnalysis";
import ChartControls from "./ChartControls";
import VolumeChart from "./VolumeChart";
import LoadingSpinner from "../ui/LoadingSpinner";
import Card from "../ui/Card";

const TradingChart = () => {
  const [timeframe, setTimeframe] = useState("1h");
  const [selectedArea, setSelectedArea] = useState(null);

  const { data, loading } = useChartData(timeframe);
  const { analysis, analyzing, analyzeData, clearAnalysis } =
    useTechnicalAnalysis();

  const handleChartClick = useCallback(
    (clickData) => {
      if (!clickData || !clickData.activePayload) return;

      const index = clickData.activePayload[0]?.payload?.index;

      if (
        selectedArea &&
        selectedArea.start !== null &&
        selectedArea.end === null
      ) {
        const start = Math.min(selectedArea.start, index);
        const end = Math.max(selectedArea.start, index);
        setSelectedArea({ start, end });
        analyzeData(data.slice(start, end + 1));
      } else {
        setSelectedArea({ start: index, end: null });
        clearAnalysis();
      }
    },
    [selectedArea, data, analyzeData, clearAnalysis]
  );

  const handleClearSelection = () => {
    setSelectedArea(null);
    clearAnalysis();
  };

  if (loading) {
    return (
      <Card className="flex items-center justify-center h-96">
        <LoadingSpinner size="large" />
        <span className="ml-3 text-gray-600">
          Cargando datos del gráfico...
        </span>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden" padding="none">
      <ChartControls
        timeframe={timeframe}
        onTimeframeChange={setTimeframe}
        onClearSelection={handleClearSelection}
        hasSelection={!!selectedArea}
      />

      <div className="relative p-4">
        <div className="h-96 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} onClick={handleChartClick}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                domain={["auto", "auto"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                name="Precio"
              />

              {selectedArea && selectedArea.end !== null && (
                <ReferenceArea
                  x1={data[selectedArea.start]?.time}
                  x2={data[selectedArea.end]?.time}
                  stroke="rgba(59, 130, 246, 0.3)"
                  fill="rgba(59, 130, 246, 0.1)"
                />
              )}
            </LineChart>
          </ResponsiveContainer>

          {analyzing && (
            <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <LoadingSpinner size="large" />
                <p className="mt-2 text-gray-600 font-medium">
                  Analizando patrón...
                </p>
              </div>
            </div>
          )}
        </div>

        <VolumeChart data={data} />
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          Haz clic en dos puntos del gráfico para seleccionar un área y
          analizarla con IA
        </p>
      </div>
    </Card>
  );
};

export default TradingChart;
