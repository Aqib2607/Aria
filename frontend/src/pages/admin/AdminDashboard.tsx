import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Users, Briefcase, Activity } from 'lucide-react';
import { Skeleton } from '../../components/ui/Skeleton';

interface Analytics {
  total_users: number;
  total_careers: number;
  total_ai_requests: number;
}

const AdminDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get('/admin/analytics');
        setAnalytics(response.data.data);
      } catch (error) {
        console.error('Failed to fetch analytics', error);
      }
    };
    fetchAnalytics();
  }, []);

  if (!analytics) return (
    <div className="p-8 space-y-8">
      <Skeleton className="h-10 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border flex items-center">
          <div className="p-4 rounded-full bg-primary/10 text-primary mr-4">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Total Users</p>
            <p className="text-2xl font-bold">{analytics.total_users}</p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-sm border border-border flex items-center">
          <div className="p-4 rounded-full bg-secondary/10 text-secondary mr-4">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Total Careers</p>
            <p className="text-2xl font-bold">{analytics.total_careers}</p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-sm border border-border flex items-center">
          <div className="p-4 rounded-full bg-accent/10 text-accent mr-4">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Total AI Requests</p>
            <p className="text-2xl font-bold">{analytics.total_ai_requests}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
