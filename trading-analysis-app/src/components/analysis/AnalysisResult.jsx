import Card from "../ui/Card";

const AnalysisResult = ({ analysis, onClear }) => {
  if (!analysis) return null;

  const getTrendColor = (trend) => {
    switch (trend) {
      case "bullish":
        return "text-success";
      case "bearish":
        return "text-error";
      default:
        return "text-warning";
    }
  };

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case "COMPRAR":
        return "text-success";
      case "VENDER":
        return "text-error";
      default:
        return "text-warning";
    }
  };

  const getTrendText = (trend) => {
    switch (trend) {
      case "bullish":
        return "ALCISTA";
      case "bearish":
        return "BAJISTA";
      default:
        return "NEUTRAL";
    }
  };

  return (
    <Card className="slide-up">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Resultados del Análisis IA
        </h3>
        <button
          onClick={onClear}
          className="text-gray-400 hover:text-gray-600 transition-colors"
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Tendencia</div>
          <div
            className={`text-lg font-semibold ${getTrendColor(analysis.trend)}`}
          >
            {getTrendText(analysis.trend)}
          </div>
        </div>

        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Recomendación</div>
          <div
            className={`text-lg font-semibold ${getRecommendationColor(
              analysis.recommendation
            )}`}
          >
            {analysis.recommendation}
          </div>
        </div>

        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Confianza</div>
          <div className="text-lg font-semibold text-primary-600">
            {analysis.confidence}%
          </div>
        </div>

        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Volatilidad</div>
          <div className="text-lg font-semibold text-purple-600">
            {analysis.volatility}%
          </div>
        </div>
      </div>

      {analysis.patterns.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">
            Patrones Detectados
          </h4>
          <div className="space-y-2">
            {analysis.patterns.map((pattern, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
              >
                <div>
                  <div className="font-medium text-gray-900">
                    {pattern.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {pattern.description}
                  </div>
                </div>
                <span
                  className={`
                  px-2 py-1 rounded text-xs font-medium
                  ${
                    pattern.strength === "alta"
                      ? "bg-green-100 text-green-800"
                      : pattern.strength === "media"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }
                `}
                >
                  {pattern.strength}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 border-l-4 border-error">
          <div className="text-sm text-gray-600">Resistencia</div>
          <div className="text-lg font-semibold text-error">
            {analysis.keyLevels.resistance.toFixed(2)}
          </div>
        </div>
        <div className="text-center p-3 border-l-4 border-warning">
          <div className="text-sm text-gray-600">Pivote</div>
          <div className="text-lg font-semibold text-warning">
            {analysis.keyLevels.pivot.toFixed(2)}
          </div>
        </div>
        <div className="text-center p-3 border-l-4 border-success">
          <div className="text-sm text-gray-600">Soporte</div>
          <div className="text-lg font-semibold text-success">
            {analysis.keyLevels.support.toFixed(2)}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AnalysisResult;
