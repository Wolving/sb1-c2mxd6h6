import React, { useState } from 'react';
import { UserProfile } from '../../types/user';
import { sendDirectMessage } from '../../services/messaging';

interface AdminUserCardProps {
  user: UserProfile;
}

export const AdminUserCard: React.FC<AdminUserCardProps> = ({ user }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async (type: 'email' | 'sms') => {
    setIsSending(true);
    try {
      await sendDirectMessage({
        userId: user.id,
        message,
        type,
        recipientEmail: user.email,
        recipientPhone: user.phoneNumber
      });
      setMessage('');
      alert(`${type.toUpperCase()} sent successfully!`);
    } catch (error) {
      console.error(`Error sending ${type}:`, error);
      alert(`Failed to send ${type}`);
    }
    setIsSending(false);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        {user.photos[0] && (
          <img
            src={user.photos[0]}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <div>
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-gray-400">${user.rate}/hr</p>
        </div>
        <span className={`ml-auto px-3 py-1 rounded-full ${
          user.status === 'IN' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {user.status}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-gray-400">Email: {user.email}</p>
          <p className="text-gray-400">Phone: {user.phoneNumber}</p>
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full bg-gray-700 text-white rounded-lg p-2"
          rows={3}
        />

        <div className="flex gap-2">
          <button
            onClick={() => handleSendMessage('email')}
            disabled={isSending || !message}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg disabled:opacity-50"
          >
            Send Email
          </button>
          <button
            onClick={() => handleSendMessage('sms')}
            disabled={isSending || !message}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg disabled:opacity-50"
          >
            Send SMS
          </button>
        </div>
      </div>
    </div>
  );
};