import React from 'react';
import { Wifi, Network, Shield, AlertTriangle } from 'lucide-react';

interface NetworkStatusProps {
  type: 'wireless' | 'wired' | 'vpn';
  strength: number;
  securityStatus: 'secure' | 'warning' | 'critical';
}

export const NetworkStatus: React.FC<NetworkStatusProps> = ({ type, strength, securityStatus }) => {
  const getIcon = () => {
    switch (type) {
      case 'wireless':
        return <Wifi className="w-8 h-8" />;
      case 'wired':
        return <Network className="w-8 h-8" />;
      case 'vpn':
        return <Shield className="w-8 h-8" />;
    }
  };

  const getStatusColor = () => {
    switch (securityStatus) {
      case 'secure':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg ${type === 'vpn' ? 'bg-blue-100' : 'bg-gray-100'}`}>
          {getIcon()}
        </div>
        <div>
          <h3 className="text-lg font-semibold capitalize">{type} Connection</h3>
          <p className="text-gray-600">Signal Strength: {strength}%</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
        {securityStatus === 'critical' && (
          <AlertTriangle className="w-5 h-5 text-red-500" />
        )}
      </div>
    </div>
  );
};