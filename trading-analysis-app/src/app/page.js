// src/app/page.js
"use client";

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import TradingChart from "@/components/charts/TradingChart";
import PatternAnalysis from "@/components/analysis/PatternAnalysis";
import TechnicalIndicators from "@/components/analysis/TechnicalIndicators";
import JapaneseCandles from "@/components/educational/JapaneseCandles";
import TradingStrategies from "@/components/educational/TradingStrategies";
import RiskManagement from "@/components/educational/RiskManagement";
import TabNavigation from "@/components/ui/TabNavigation";

export default function Home() {
  const [activeTab, setActiveTab] = useState("analysis");

  const tabs = [
    { id: "analysis", label: "Análisis en Tiempo Real" },
    { id: "patterns", label: "Patrones Chartistas" },
    { id: "indicators", label: "Indicadores" },
    { id: "candles", label: "Velas Japonesas" },
    { id: "strategies", label: "Estrategias" },
    { id: "risk", label: "Gestión de Riesgo" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "analysis":
        return <TradingChart />;
      case "patterns":
        return <PatternAnalysis />;
      case "indicators":
        return <TechnicalIndicators />;
      case "candles":
        return <JapaneseCandles />;
      case "strategies":
        return <TradingStrategies />;
      case "risk":
        return <RiskManagement />;
      default:
        return <TradingChart />;
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Plataforma Profesional de Trading
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Análisis técnico avanzado con gráficos profesionales en tiempo
              real, reconocimiento de patrones por IA y herramientas educativas
              completas.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="mb-8"
        />

        <div className="fade-in">{renderTabContent()}</div>
      </section>
    </Layout>
  );
}
