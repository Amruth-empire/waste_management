import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Donate from './pages/Donate';
import UploadTrash from './pages/UploadTrash';
import Login from './pages/Login';
import SignUp from "./pages/Signup";
import React from 'react';
import Tokens from './pages/Tokens';

function App() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 font-[Plus Jakarta Sans, Noto Sans, sans-serif] overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/upload" element={<UploadTrash />} />
              <Route path="/tokens" element={<Tokens />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;