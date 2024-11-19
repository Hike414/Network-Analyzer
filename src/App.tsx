import React, { useState, useEffect } from 'react';
import { NetworkStatus } from './components/NetworkStatus';
import { AnomalyCard } from './components/AnomalyCard';
import { TrafficChart } from './components/TrafficChart';
import { SecurityMetrics } from './components/SecurityMetrics';
import { Activity, Shield, Radio, BarChart3, Info } from 'lucide-react';
import { networkService } from './services/networkService';
import type { NetworkData, TrafficData, Anomaly, SecurityMetric } from './services/networkService';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [networkStatus, setNetworkStatus] = useState<NetworkData>({
    type: 'wireless',
    strength: 85,
    securityStatus: 'secure',
  });
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetric[]>([]);

  useEffect(() => {
    const unsubscribe = networkService.subscribe((data) => {
      setNetworkStatus(data.network);
      setTrafficData(data.traffic);
      setAnomalies(data.anomalies);
      setSecurityMetrics(data.security);
    });

    return () => unsubscribe();
  }, []);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'traffic', name: 'Traffic', icon: Radio },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'about', name: 'About', icon: Info },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <NetworkStatus {...networkStatus} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Network Traffic</h2>
                <TrafficChart data={trafficData} />
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Anomalies</h2>
                <div className="space-y-4">
                  {anomalies.map((anomaly) => (
                    <AnomalyCard key={anomaly.id} {...anomaly} />
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Security Status</h2>
              <SecurityMetrics metrics={securityMetrics} />
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Security Alerts</h2>
              <div className="space-y-4">
                {anomalies.map((anomaly) => (
                  <AnomalyCard key={anomaly.id} {...anomaly} />
                ))}
              </div>
            </div>
          </div>
        );
      case 'traffic':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Network Traffic Analysis</h2>
            <TrafficChart data={trafficData} />
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Network Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {securityMetrics.map((metric, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-700">{metric.category}</h3>
                    <p className="text-2xl font-bold mt-2">{Math.round(metric.value)}%</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Historical Traffic</h2>
              <TrafficChart data={trafficData} />
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-indigo-600">About Network Analyzer</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-6">
                  Network Analyzer is an advanced AI-powered network monitoring and security analysis tool designed to provide real-time insights into your network's health, security status, and performance metrics.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-indigo-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-4">Key Features</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <Shield className="w-5 h-5 text-indigo-600 mt-1 mr-2" />
                        Real-time network monitoring and analysis
                      </li>
                      <li className="flex items-start">
                        <Activity className="w-5 h-5 text-indigo-600 mt-1 mr-2" />
                        Advanced anomaly detection system
                      </li>
                      <li className="flex items-start">
                        <Radio className="w-5 h-5 text-indigo-600 mt-1 mr-2" />
                        Comprehensive traffic analysis
                      </li>
                      <li className="flex items-start">
                        <BarChart3 className="w-5 h-5 text-indigo-600 mt-1 mr-2" />
                        Detailed security metrics and analytics
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-green-700 mb-4">How It Works</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <div className="bg-green-200 rounded-full w-6 h-6 flex items-center justify-center text-green-800 font-semibold mr-2 mt-1">1</div>
                        Continuous monitoring of network traffic and connections
                      </li>
                      <li className="flex items-start">
                        <div className="bg-green-200 rounded-full w-6 h-6 flex items-center justify-center text-green-800 font-semibold mr-2 mt-1">2</div>
                        AI-powered analysis of traffic patterns and anomalies
                      </li>
                      <li className="flex items-start">
                        <div className="bg-green-200 rounded-full w-6 h-6 flex items-center justify-center text-green-800 font-semibold mr-2 mt-1">3</div>
                        Real-time security threat detection and alerts
                      </li>
                      <li className="flex items-start">
                        <div className="bg-green-200 rounded-full w-6 h-6 flex items-center justify-center text-green-800 font-semibold mr-2 mt-1">4</div>
                        Automated security recommendations and insights
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Network Analysis</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Real-time packet inspection</li>
                        <li>• Protocol analysis and categorization</li>
                        <li>• Bandwidth monitoring and optimization</li>
                        <li>• Connection type detection and analysis</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Security Features</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• AI-powered threat detection</li>
                        <li>• Anomaly detection and alerting</li>
                        <li>• Security metric tracking</li>
                        <li>• Automated security recommendations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
          <h1 className="text-3xl font-bold text-gray-900">Network Analyzer</h1>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:shadow-md'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">{renderContent()}</div>
      </div>
    </div>
  );
}

export default App;