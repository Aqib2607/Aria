import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import api from '../services/api';

interface Notification {
  id: number;
  title: string;
  message: string;
  status: 'unread' | 'read';
  created_at: string;
}

const NotificationPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/notifications');
      setNotifications(response.data.data);
    } catch (error) {
      console.error('Failed to fetch notifications');
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => n.id === id ? { ...n, status: 'read' } : n));
    } catch (error) {
      console.error('Failed to mark notification as read');
    }
  };

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
        className="relative p-2 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-popover rounded-lg shadow-lg overflow-hidden z-50 border border-border">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-popover-foreground">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No notifications right now.
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                    notification.status === 'unread' ? 'bg-primary/5' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <h4 className={`text-sm font-medium ${notification.status === 'unread' ? 'text-primary' : 'text-foreground'}`}>
                    {notification.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.message}
                  </p>
                  <span className="text-[10px] text-muted-foreground mt-2 block">
                    {new Date(notification.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
