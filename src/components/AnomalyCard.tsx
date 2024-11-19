import React from 'react';
import { AlertOctagon, Clock, ArrowUpRight } from 'lucide-react';

interface AnomalyCardProps {
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  timestamp: string;
  sourceIP: string;
}

export const AnomalyCard: React.FC<AnomalyCardProps> = ({
  severity,
  title,
  description,
  timestamp,
  sourceIP,
}) => {
  const getSeverityColor = () => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getSeverityColor()} relative`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          <AlertOctagon className="w-5 h-5" />
          <h3 className="font-semibold">{title}</h3>
        </div>
        <button className="text-gray-600 hover:text-gray-900">
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
      <p className="mt-2 text-sm">{description}</p>
      <div className="mt-3 flex items-center text-sm space-x-4">
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{timestamp}</span>
        </div>
        <div>Source: {sourceIP}</div>
      </div>
    </div>
  );
};