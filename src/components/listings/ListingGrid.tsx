import React from 'react';
import { UserProfile } from '../../types/user';

interface ListingGridProps {
  profiles: UserProfile[];
}

export const ListingGrid: React.FC<ListingGridProps> = ({ profiles }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map((profile) => (
        <div key={profile.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {profile.photos[0] && (
            <img
              src={profile.photos[0]}
              alt={profile.name}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold">{profile.name}</h3>
            <p className="text-gray-600">${profile.rate}/hr</p>
            <span className={`inline-block px-2 py-1 rounded ${
              profile.status === 'IN' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {profile.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};