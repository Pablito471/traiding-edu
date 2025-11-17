const TabNavigation = ({ tabs, activeTab, onTabChange, className = "" }) => {
  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <nav className="flex space-x-8" aria-label="Pestañas">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              transition-colors duration-200
              ${
                activeTab === tab.id
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;
