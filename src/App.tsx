import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { SignUpForm } from './components/auth/SignUpForm';
import { LoginForm } from './components/auth/LoginForm';
import { ListingGrid } from './components/listings/ListingGrid';
import { ProfileEdit } from './components/profile/ProfileEdit';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/listings" element={<ListingGrid profiles={[]} />} />
            <Route path="/profile" element={<ProfileEdit />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;