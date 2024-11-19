import React from 'react';
import { Shield, AlertTriangle, XOctagon } from 'lucide-react';
import type { SecurityMetric } from '../services/networkService';

interface SecurityMetricsProps {
  metrics: SecurityMetric[];
}

export const SecurityMetrics: React.FC<SecurityMetricsProps> = ({ metrics }) => {
  const getStatusIcon = (status: SecurityMetric['status']) => {
    switch (status) {
      case 'good':
        return <Shield className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical':
        return <XOctagon className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: SecurityMetric['status']) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 border-green-200';
      case 'warning':
        return 'bg-yellow-100 border-yellow-200';
      case 'critical':
        return 'bg-red-100 border-red-200';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg border ${getStatusColor(metric.status)}`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{metric.category}</h3>
            {getStatusIcon(metric.status)}
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  metric.status === 'good'
                    ? 'bg-green-500'
                    : metric.status === 'warning'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${metric.value}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">{Math.round(metric.value)}% Health</p>
          </div>
        </div>
      ))}
    </div>
  );
};