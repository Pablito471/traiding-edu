"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label, data }) => {
  if (active && payload && payload.length) {
    const volume = payload[0].value;
    const priceData = data?.find((item) => item.time === label);

    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">
          Volumen:{" "}
          <span className="font-medium">{volume?.toLocaleString()}</span>
        </p>
        {priceData && (
          <p className="text-sm text-gray-600">
            Cierre: <span className="font-medium">${priceData.close}</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

const VolumeChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-32 mt-4 flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-sm">
          No hay datos de volumen disponibles
        </p>
      </div>
    );
  }

  const getBarColor = (entry, index) => {
    if (index === 0) return "#9ca3af";

    const currentClose = entry.close;
    const previousClose = data[index - 1]?.close;

    if (!previousClose) return "#9ca3af";

    if (currentClose > previousClose) {
      return "#10b981";
    } else if (currentClose < previousClose) {
      return "#ef4444";
    } else {
      return "#9ca3af";
    }
  };

  return (
    <div className="h-32 mt-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-700">Volumen</h4>
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Alcista</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Bajista</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#6b7280" }}
            interval="preserveStartEnd"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#6b7280" }}
            width={35}
            tickFormatter={(value) => {
              if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
              return value;
            }}
          />
          <Tooltip content={<CustomTooltip data={data} />} />
          <Bar
            dataKey="volume"
            radius={[2, 2, 0, 0]}
            fill={(data) => {
              const index = data.index;
              return getBarColor(data, index);
            }}
            opacity={0.8}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VolumeChart;
