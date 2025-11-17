import Card from "../ui/Card";

const JapaneseCandles = () => {
  const candlePatterns = [
    {
      name: "Martillo",
      type: "reversión alcista",
      description:
        "Cuerpo pequeño en la parte superior con sombra inferior larga, aparece en tendencia bajista",
      interpretation: "Potencial cambio de tendencia a alcista",
      confidence: "Alta",
    },
    {
      name: "Estrella Fugaz",
      type: "reversión bajista",
      description:
        "Cuerpo pequeño en la parte inferior con sombra superior muy larga, aparece en tendencia alcista",
      interpretation: "Potencial cambio de tendencia a bajista",
      confidence: "Alta",
    },
    {
      name: "Engulfing Alcista",
      type: "reversión alcista",
      description:
        "Vela alcista grande que engulle completamente a la vela bajista anterior",
      interpretation: "Fuerte presión compradora superando a los vendedores",
      confidence: "Media-Alta",
    },
    {
      name: "Engulfing Bajista",
      type: "reversión bajista",
      description:
        "Vela bajista grande que engulle completamente a la vela alcista anterior",
      interpretation: "Fuerte presión vendedora superando a los compradores",
      confidence: "Media-Alta",
    },
    {
      name: "Doji",
      type: "indecisión",
      description:
        "Apertura y cierre en el mismo nivel o muy cercanos, muestra indecisión del mercado",
      interpretation:
        "Potencial cambio de tendencia o pausa en la continuación",
      confidence: "Media",
    },
  ];

  return (
    <Card>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Patrones de Velas Japonesas
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {candlePatterns.map((pattern, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-gray-900">{pattern.name}</h3>
              <span
                className={`
                px-2 py-1 rounded text-xs font-medium
                ${
                  pattern.type.includes("alcista")
                    ? "bg-green-100 text-green-800"
                    : pattern.type.includes("bajista")
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }
              `}
              >
                {pattern.type}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{pattern.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Interpretación</span>
              <span className="text-sm font-medium text-gray-700">
                {pattern.interpretation}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">
          Conceptos Básicos de las Velas
        </h3>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>
            • <strong>Cuerpo:</strong> Diferencia entre precio de apertura y
            cierre
          </li>
          <li>
            • <strong>Sombra/Mecha:</strong> Máximos y mínimos de la sesión de
            trading
          </li>
          <li>
            • <strong>Vela Alcista:</strong> Cierre mayor que apertura
            (generalmente verde/blanca)
          </li>
          <li>
            • <strong>Vela Bajista:</strong> Cierre menor que apertura
            (generalmente roja/negra)
          </li>
          <li>
            • <strong>Doji:</strong> Apertura igual a cierre - indecisión del
            mercado
          </li>
        </ul>
      </div>
    </Card>
  );
};

export default JapaneseCandles;
