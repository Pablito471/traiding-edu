const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TA</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                TradingAnalyst
              </h1>
              <p className="text-xs text-gray-500">Análisis Profesional</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Características
            </a>
            <a
              href="#analysis"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Análisis
            </a>
            <a
              href="#education"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Educación
            </a>
          </nav>

          <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
