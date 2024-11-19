import { format } from 'date-fns';

export interface NetworkData {
  type: 'wireless' | 'wired' | 'vpn';
  strength: number;
  securityStatus: 'secure' | 'warning' | 'critical';
}

export interface TrafficData {
  time: string;
  inbound: number;
  outbound: number;
}

export interface Anomaly {
  id: string;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  timestamp: string;
  sourceIP: string;
}

export interface SecurityMetric {
  category: string;
  value: number;
  status: 'good' | 'warning' | 'critical';
}

class NetworkService {
  private listeners: Set<(data: any) => void> = new Set();
  private intervalId: number | null = null;

  subscribe(callback: (data: any) => void) {
    this.listeners.add(callback);
    if (!this.intervalId) {
      this.startUpdates();
    }
    return () => {
      this.listeners.delete(callback);
      if (this.listeners.size === 0) {
        this.stopUpdates();
      }
    };
  }

  private startUpdates() {
    this.intervalId = window.setInterval(() => {
      const data = this.generateData();
      this.listeners.forEach(callback => callback(data));
    }, 2000);
  }

  private stopUpdates() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private generateData() {
    return {
      network: this.generateNetworkStatus(),
      traffic: this.generateTrafficData(),
      anomalies: this.generateAnomalies(),
      security: this.generateSecurityMetrics(),
    };
  }

  private generateNetworkStatus(): NetworkData {
    const types: Array<'wireless' | 'wired' | 'vpn'> = ['wireless', 'wired', 'vpn'];
    const statuses: Array<'secure' | 'warning' | 'critical'> = ['secure', 'warning', 'critical'];
    
    return {
      type: types[Math.floor(Math.random() * types.length)],
      strength: Math.floor(Math.random() * 40) + 60, // 60-100
      securityStatus: Math.random() > 0.8 ? 'warning' : 'secure',
    };
  }

  private generateTrafficData(): TrafficData[] {
    return Array.from({ length: 24 }, (_, i) => ({
      time: format(new Date().setHours(i), 'HH:mm'),
      inbound: Math.floor(Math.random() * 100),
      outbound: Math.floor(Math.random() * 80),
    }));
  }

  private generateAnomalies(): Anomaly[] {
    const anomalyTypes = [
      { title: 'Suspicious Port Scan', description: 'Multiple connection attempts from unknown IP' },
      { title: 'Unusual Traffic Pattern', description: 'Spike in outbound traffic on port 443' },
      { title: 'Potential Data Exfiltration', description: 'Large data transfer to unknown endpoint' },
    ];

    return Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => {
      const type = anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
      return {
        id: `anomaly-${Date.now()}-${i}`,
        severity: Math.random() > 0.7 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low',
        title: type.title,
        description: type.description,
        timestamp: `${Math.floor(Math.random() * 10) + 1} minutes ago`,
        sourceIP: `192.168.1.${Math.floor(Math.random() * 255)}`,
      };
    });
  }

  private generateSecurityMetrics(): SecurityMetric[] {
    return [
      {
        category: 'Firewall Status',
        value: Math.random() * 100,
        status: Math.random() > 0.8 ? 'warning' : 'good',
      },
      {
        category: 'Intrusion Attempts',
        value: Math.floor(Math.random() * 50),
        status: Math.random() > 0.9 ? 'critical' : Math.random() > 0.7 ? 'warning' : 'good',
      },
      {
        category: 'SSL Certificate Health',
        value: Math.random() * 100,
        status: Math.random() > 0.9 ? 'warning' : 'good',
      },
    ];
  }
}

export const networkService = new NetworkService();