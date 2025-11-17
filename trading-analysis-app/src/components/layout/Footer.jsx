const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">TA</span>
            </div>
            <span className="text-sm text-gray-600">TradingAnalyst © 2024</span>
          </div>

          <div className="text-sm text-gray-500 text-center md:text-right">
            <p>Plataforma educativa para análisis técnico</p>
            <p className="mt-1 text-xs">
              El trading conlleva riesgos. El rendimiento pasado no garantiza
              resultados futuros.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
