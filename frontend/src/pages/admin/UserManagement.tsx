import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Trash2 } from 'lucide-react';
import { Skeleton } from '../../components/ui/Skeleton';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (id: number, role: 'user' | 'admin') => {
    try {
      await api.put(`/admin/users/${id}`, { role });
      fetchUsers();
    } catch (error) {
      console.error('Failed to update user role', error);
    }
  };

  const deleteUser = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">User Management</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="p-4 font-medium text-muted-foreground">ID</th>
              <th className="p-4 font-medium text-muted-foreground">Name</th>
              <th className="p-4 font-medium text-muted-foreground">Email</th>
              <th className="p-4 font-medium text-muted-foreground">Role</th>
              <th className="p-4 font-medium text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="p-4"><Skeleton className="h-4 w-8" /></td>
                  <td className="p-4"><Skeleton className="h-4 w-32" /></td>
                  <td className="p-4"><Skeleton className="h-4 w-48" /></td>
                  <td className="p-4"><Skeleton className="h-8 w-24" /></td>
                  <td className="p-4"><Skeleton className="h-8 w-8 ml-auto" /></td>
                </tr>
              ))
            ) : users.map((user) => (
              <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="p-4 text-muted-foreground">{user.id}</td>
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4 text-muted-foreground">{user.email}</td>
                <td className="p-4">
                  <select
                    id={`role-select-${user.id}`}
                    name={`role-${user.id}`}
                    value={user.role}
                    onChange={(e) => updateRole(user.id, e.target.value as 'user' | 'admin')}
                    aria-label={`Select role for ${user.name}`}
                    title={`Select role for ${user.name}`}
                    className="border border-input bg-background rounded px-2 py-1 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-destructive hover:text-destructive/80 p-2 rounded hover:bg-destructive/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive"
                    title="Delete User"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-muted-foreground">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
