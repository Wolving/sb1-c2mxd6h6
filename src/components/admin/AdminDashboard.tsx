import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { UserProfile } from '../../types/user';
import { AdminUserCard } from './AdminUserCard';

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'IN' | 'OUT'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as UserProfile));
      setUsers(userData);
    });

    return () => unsubscribe();
  }, []);

  const filteredUsers = users
    .filter(user => filter === 'ALL' || user.status === filter)
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search users..."
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'ALL' | 'IN' | 'OUT')}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
          >
            <option value="ALL">All Users</option>
            <option value="IN">Status: IN</option>
            <option value="OUT">Status: OUT</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => (
            <AdminUserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};