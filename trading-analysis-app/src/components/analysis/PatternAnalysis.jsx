"use client";

import { useState } from "react";
import Card from "../ui/Card";
import TabNavigation from "../ui/TabNavigation";

const PatternAnalysis = () => {
  const [selectedPattern, setSelectedPattern] = useState(null);

  const chartPatterns = {
    HCH: {
      name: "Hombro Cabeza Hombros",
      type: "Reversión",
      description:
        "Patrón de reversión que señala un cambio de tendencia de alcista a bajista",
      formation:
        "Tres picos: hombro izquierdo, cabeza (más alto), hombro derecho",
      breakout: "Ruputa por debajo de la línea de cuello",
      target:
        "Distancia desde la cabeza a la línea de cuello proyectada hacia abajo",
      reliability: "Alta",
      image: "📉",
      timeframe: "Todos los timeframes",
    },
    DobleTecho: {
      name: "Doble Techo",
      type: "Reversión",
      description:
        "Dos picos aproximadamente al mismo nivel después de una tendencia alcista",
      formation: "Dos máximos similares con un valle intermedio",
      breakout: "Ruputa por debajo del nivel de soporte (línea de cuello)",
      target: "Distancia desde los picos a la línea de cuello",
      reliability: "Media-Alta",
      image: "⛰️",
      timeframe: "1H y superiores",
    },
    DobleSuelo: {
      name: "Doble Suelo",
      type: "Reversión",
      description:
        "Dos valles aproximadamente al mismo nivel después de una tendencia bajista",
      formation: "Dos mínimos similares con un pico intermedio",
      breakout: "Ruputa por encima del nivel de resistencia (línea de cuello)",
      target: "Distancia desde los valles a la línea de cuello",
      reliability: "Media-Alta",
      image: "🏔️",
      timeframe: "1H y superiores",
    },
  };

  const patternCategories = [
    { id: "reversal", label: "Patrones de Reversión" },
    { id: "continuation", label: "Patrones de Continuación" },
    { id: "all", label: "Todos los Patrones" },
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPatterns = Object.entries(chartPatterns).filter(
    ([_, pattern]) => {
      if (activeCategory === "all") return true;
      if (activeCategory === "reversal")
        return pattern.type.includes("Reversión");
      return true;
    }
  );

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Enciclopedia de Patrones Chartistas
        </h2>

        <TabNavigation
          tabs={patternCategories}
          activeTab={activeCategory}
          onTabChange={setActiveCategory}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredPatterns.map(([key, pattern]) => (
          <div
            key={key}
            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedPattern === key
                ? "ring-2 ring-primary-500 bg-primary-50"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedPattern(key)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {pattern.image} {pattern.name}
                </h3>
                <span
                  className={`inline-block px-2 py-1 rounded text-xs mt-1 ${
                    pattern.type.includes("Reversión")
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {pattern.type}
                </span>
              </div>
              <div className="text-2xl ml-2">{pattern.image}</div>
            </div>

            <p className="text-gray-600 text-xs mb-2 line-clamp-2">
              {pattern.description}
            </p>

            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Fiabilidad: {pattern.reliability}</span>
              <span>{pattern.timeframe}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedPattern && chartPatterns[selectedPattern] && (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 animate-slide-up">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {chartPatterns[selectedPattern].image}{" "}
                {chartPatterns[selectedPattern].name}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Patrón de {chartPatterns[selectedPattern].type}
              </p>
            </div>
            <button
              onClick={() => setSelectedPattern(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Formación del Patrón
                </h4>
                <p className="text-gray-600 text-sm">
                  {chartPatterns[selectedPattern].formation}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Señal de Breakout
                </h4>
                <p className="text-gray-600 text-sm">
                  {chartPatterns[selectedPattern].breakout}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Objetivo de Precio
                </h4>
                <p className="text-gray-600 text-sm">
                  {chartPatterns[selectedPattern].target}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Fiabilidad & Timeframe
                </h4>
                <div className="flex items-center space-x-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full ${
                      chartPatterns[selectedPattern].reliability === "Alta"
                        ? "bg-green-100 text-green-800"
                        : chartPatterns[selectedPattern].reliability ===
                          "Media-Alta"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {chartPatterns[selectedPattern].reliability}
                  </span>
                  <span className="text-gray-600">
                    {chartPatterns[selectedPattern].timeframe}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Estrategia de Trading
                </h4>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      Esperar la finalización y confirmación del patrón
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      Entrar en el breakout con confirmación de volumen
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      Colocar stop loss por debajo del patrón para reversiones
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      Tomar ganancias en el objetivo medido
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">
              💡 Consejos Profesionales
            </h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Siempre confirmar breakouts con aumento de volumen</li>
              <li>
                • Considerar el contexto general del mercado y la tendencia
              </li>
              <li>• Usar múltiples timeframes para confirmación</li>
              <li>
                • Combinar con otros indicadores técnicos para mayor
                probabilidad
              </li>
              <li>
                • Practicar el reconocimiento de patrones en datos históricos
                primero
              </li>
            </ul>
          </div>
        </div>
      )}

      {!selectedPattern && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🔍</div>
          <p>
            Selecciona un patrón para ver análisis detallado y estrategia de
            trading
          </p>
        </div>
      )}
    </Card>
  );
};

export default PatternAnalysis;
