"use client";

import { useState } from "react";
import Card from "../ui/Card";
import TabNavigation from "../ui/TabNavigation";

const TradingStrategies = () => {
  const [activeMarket, setActiveMarket] = useState("forex");

  const strategies = {
    forex: [
      {
        name: "Seguimiento de Tendencia",
        description: "Operar en la dirección de la tendencia establecida",
        timeframes: ["4H", "1D"],
        indicators: ["EMA 20/50", "MACD", "RSI"],
        entry: "Retroceso a la media móvil con confirmación RSI",
        exit: "Ruputa de línea de tendencia o señal opuesta",
        risk: "Moderado",
      },
      {
        name: "Trading de Rango",
        description:
          "Operar entre niveles establecidos de soporte y resistencia",
        timeframes: ["1H", "4H"],
        indicators: ["Soporte/Resistencia", "RSI", "Bandas de Bollinger"],
        entry: "Rebote en soporte/resistencia con RSI en extremo",
        exit: "Nivel opuesto o confirmación de breakout",
        risk: "Bajo-Moderado",
      },
    ],
    crypto: [
      {
        name: "Trading de Breakout",
        description: "Operar rupturas de patrones de consolidación",
        timeframes: ["1H", "4H"],
        indicators: ["Volumen", "Bandas de Bollinger", "ATR"],
        entry: "Breakout con confirmación de volumen",
        exit: "Objetivo alcanzado o breakout fallido",
        risk: "Alto",
      },
    ],
  };

  const markets = [
    { id: "forex", label: "Forex" },
    { id: "crypto", label: "Crypto" },
    { id: "stocks", label: "Acciones" },
  ];

  return (
    <Card>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Estrategias de Trading
      </h2>

      <TabNavigation
        tabs={markets}
        activeTab={activeMarket}
        onTabChange={setActiveMarket}
        className="mb-6"
      />

      <div className="space-y-6">
        {strategies[activeMarket]?.map((strategy, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">
              {strategy.name}
            </h3>
            <p className="text-gray-600 mb-4">{strategy.description}</p>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Timeframes: </span>
                <span className="text-gray-600">
                  {strategy.timeframes.join(", ")}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Nivel de Riesgo:{" "}
                </span>
                <span
                  className={`
                  ${
                    strategy.risk === "Alto"
                      ? "text-red-600"
                      : strategy.risk === "Moderado"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }
                `}
                >
                  {strategy.risk}
                </span>
              </div>
              <div className="md:col-span-2">
                <span className="font-medium text-gray-700">Indicadores: </span>
                <span className="text-gray-600">
                  {strategy.indicators.join(", ")}
                </span>
              </div>
              <div className="md:col-span-2">
                <span className="font-medium text-gray-700">Entrada: </span>
                <span className="text-gray-600">{strategy.entry}</span>
              </div>
              <div className="md:col-span-2">
                <span className="font-medium text-gray-700">Salida: </span>
                <span className="text-gray-600">{strategy.exit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TradingStrategies;
