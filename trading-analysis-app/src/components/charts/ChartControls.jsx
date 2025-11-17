const ChartControls = ({
  timeframe,
  onTimeframeChange,
  onClearSelection,
  hasSelection,
}) => {
  const timeframes = ["1m", "5m", "15m", "1h", "4h", "1d", "1w"];

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border-b border-gray-200">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Timeframe:</span>
        <div className="flex flex-wrap gap-1">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`
                px-3 py-1.5 text-xs font-medium rounded-md transition-colors
                ${
                  timeframe === tf
                    ? "bg-primary-100 text-primary-700 border border-primary-200"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }
              `}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {hasSelection && (
        <button
          onClick={onClearSelection}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Limpiar Selección
        </button>
      )}
    </div>
  );
};

export default ChartControls;
