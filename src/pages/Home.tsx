import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Welcome to Our Platform
          </h1>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="inline-block bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};