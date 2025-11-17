"use client";

import { useState } from "react";
import Card from "../ui/Card";
import TabNavigation from "../ui/TabNavigation";

const TechnicalIndicators = () => {
  const [activeIndicator, setActiveIndicator] = useState("rsi");

  const indicators = {
    rsi: {
      name: "RSI (Índice de Fuerza Relativa)",
      description:
        "Mide la velocidad y cambio de movimientos de precios en una escala de 0 a 100.",
      interpretation: "Sobrecompra (>70), Sobreventa (<30), Neutral (30-70)",
      formula:
        "RSI = 100 - (100 / (1 + RS)) donde RS = Ganancia Promedio / Pérdida Promedio",
      usage: "Identificar condiciones de sobrecompra/sobreventa y divergencias",
      settings: "Período: 14, Niveles: 30-70",
    },
    macd: {
      name: "MACD (Convergencia/Divergencia de Medias Móviles)",
      description:
        "Muestra la relación entre dos medias móviles exponenciales.",
      interpretation:
        "Cruces de línea de señal, Cruces de línea cero, Divergencias",
      formula:
        "Línea MACD = EMA(12) - EMA(26), Línea de Señal = EMA(9) de MACD",
      usage:
        "Dirección de tendencia, momentum y puntos potenciales de reversión",
      settings: "Rápida: 12, Lenta: 26, Señal: 9",
    },
    bb: {
      name: "Bandas de Bollinger",
      description:
        "Bandas de volatilidad colocadas arriba y abajo de una media móvil.",
      interpretation:
        "Apretón (baja volatilidad), Expansión (alta volatilidad), Breakouts",
      formula: "Banda Superior = SMA(20) + 2σ, Banda Inferior = SMA(20) - 2σ",
      usage: "Identificar volatilidad y puntos potenciales de breakout",
      settings: "Período: 20, Desviaciones: 2",
    },
  };

  const tabs = Object.keys(indicators).map((key) => ({
    id: key,
    label: indicators[key].name.split(" ")[0],
  }));

  return (
    <Card>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Indicadores Técnicos
      </h2>

      <TabNavigation
        tabs={tabs}
        activeTab={activeIndicator}
        onTabChange={setActiveIndicator}
        className="mb-6"
      />

      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Descripción</h3>
          <p className="text-gray-600">
            {indicators[activeIndicator].description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Interpretación</h4>
            <p className="text-gray-600">
              {indicators[activeIndicator].interpretation}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Fórmula</h4>
            <code className="text-sm bg-gray-100 p-2 rounded block text-gray-700">
              {indicators[activeIndicator].formula}
            </code>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Uso en Trading</h4>
            <p className="text-gray-600">{indicators[activeIndicator].usage}</p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Configuración</h4>
            <p className="text-gray-600">
              {indicators[activeIndicator].settings}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TechnicalIndicators;
