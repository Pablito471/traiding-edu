"use client";

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import TradingChart from "@/components/charts/TradingChart";
import AnalysisResult from "@/components/analysis/AnalysisResult";
import PatternAnalysis from "@/components/analysis/PatternAnalysis";
import TechnicalIndicators from "@/components/analysis/TechnicalIndicators";
import JapaneseCandles from "@/components/educational/JapaneseCandles";
import TradingStrategies from "@/components/educational/TradingStrategies";
import RiskManagement from "@/components/educational/RiskManagement";
import TabNavigation from "@/components/ui/TabNavigation";
import { useTechnicalAnalysis } from "@/hooks/useTechnicalAnalysis";

export default function Home() {
  const [activeTab, setActiveTab] = useState("analysis");
  const { analysis, clearAnalysis } = useTechnicalAnalysis();

  const tabs = [
    { id: "analysis", label: "Análisis de Gráfico" },
    { id: "patterns", label: "Patrones Chartistas" },
    { id: "indicators", label: "Indicadores" },
    { id: "candles", label: "Velas Japonesas" },
    { id: "strategies", label: "Estrategias" },
    { id: "risk", label: "Gestión de Riesgo" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "analysis":
        return (
          <div className="space-y-6">
            <TradingChart />
            {analysis && (
              <AnalysisResult analysis={analysis} onClear={clearAnalysis} />
            )}
          </div>
        );
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
        return (
          <div className="space-y-6">
            <TradingChart />
            {analysis && (
              <AnalysisResult analysis={analysis} onClear={clearAnalysis} />
            )}
          </div>
        );
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Análisis Profesional de Trading
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plataforma avanzada de análisis técnico con reconocimiento de
              patrones por IA, recursos educativos completos y herramientas
              profesionales de trading.
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
