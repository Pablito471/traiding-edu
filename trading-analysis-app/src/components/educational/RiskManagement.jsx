import Card from "../ui/Card";

const RiskManagement = () => {
  const rules = [
    {
      rule: "Regla 1-2%",
      description:
        "Nunca arriesgar más del 1-2% de tu capital de trading en una sola operación",
      importance: "Crítica",
    },
    {
      rule: "Stop Loss",
      description: "Siempre usar stop losses para limitar pérdidas potenciales",
      importance: "Crítica",
    },
    {
      rule: "Ratio Riesgo-Beneficio",
      description:
        "Mantener un ratio mínimo de 1:2 riesgo-beneficio para trading rentable",
      importance: "Alta",
    },
    {
      rule: "Tamaño de Posición",
      description:
        "Ajustar el tamaño de la posición basado en la distancia del stop loss y el tamaño de la cuenta",
      importance: "Alta",
    },
    {
      rule: "Diversificación",
      description:
        "No poner todo el capital en una operación o activos correlacionados",
      importance: "Media",
    },
    {
      rule: "Control Emocional",
      description:
        "Mantenerse en el plan de trading y evitar decisiones emocionales",
      importance: "Crítica",
    },
  ];

  return (
    <Card>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Gestión de Riesgo
      </h2>

      <div className="space-y-4">
        {rules.map((item, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <div
              className={`
              flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium
              ${
                item.importance === "Crítica"
                  ? "bg-red-500"
                  : item.importance === "Alta"
                  ? "bg-orange-500"
                  : "bg-blue-500"
              }
            `}
            >
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">{item.rule}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">Importancia</span>
                <span
                  className={`
                  text-xs font-medium px-2 py-1 rounded
                  ${
                    item.importance === "Crítica"
                      ? "bg-red-100 text-red-800"
                      : item.importance === "Alta"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-blue-100 text-blue-800"
                  }
                `}
                >
                  {item.importance}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-medium text-yellow-800 mb-2">
          ⚠️ Aviso Importante
        </h3>
        <p className="text-yellow-700 text-sm">
          El trading conlleva un riesgo sustancial de pérdida. Solo opera con
          dinero que puedas permitirte perder. El rendimiento pasado no es
          indicativo de resultados futuros. Siempre practica primero con cuentas
          demo.
        </p>
      </div>
    </Card>
  );
};

export default RiskManagement;
