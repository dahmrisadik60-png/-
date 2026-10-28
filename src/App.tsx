import { ArrowLeft, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

export default function App() {
  const [logoUrl, setLogoUrl] = useState(() => localStorage.getItem('logoUrl') || 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png');
  const [showLanguages, setShowLanguages] = useState(false);
  const [language, setLanguage] = useState('English (US)');
  const [showDashboard, setShowDashboard] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

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

  if (showDashboard && isAuthorized) {
    return (
      <div className="p-4 bg-slate-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button onClick={() => setShowDashboard(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-4">Site Customization</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Change Site Logo</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleLogoUpload} 
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100 transition-all cursor-pointer"
              />
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-slate-500 mb-2">Logo Preview:</p>
              <img src={logoUrl} alt="Preview" className="w-[72px] h-[72px] object-cover rounded-[15px] border mx-auto shadow-sm" />
            </div>
          </div>
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
            <div className="absolute top-full right-0 mt-2 bg-white border rounded shadow-md w-32 z-10 max-h-60 overflow-y-auto shadow-lg ring-1 ring-black ring-opacity-5">
              {Object.keys(translations).map(lang => (
                <div key={lang} className="p-2 hover:bg-gray-100 text-sm text-gray-800" onClick={(e) => { e.stopPropagation(); changeLanguage(lang); }}>{lang}</div>
              ))}
            </div>
          )}
        </div>
        <div className="w-6"></div>
      </div>

      {/* Main Form Area */}
      <div className="flex-grow w-full max-w-xs flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <img src={logoUrl} alt="Instagram" className="w-[72px] h-[72px] object-cover rounded-[15px] shadow-sm" />
        </div>
        <input 
            type="text" 
            placeholder={currentLang.username}
            className="w-full p-3 border border-gray-300 rounded-md mb-3 bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all"
        />
        <input 
            type="password" 
            placeholder={currentLang.password}
            className="w-full p-3 border border-gray-300 rounded-md mb-3 bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all"
        />
        <button 
          onClick={() => window.location.href = 'https://www.instagram.com/'}
          className="w-full bg-[#0095F6] text-white font-semibold py-3 rounded-md mb-4 text-sm active:opacity-80 hover:bg-[#1877F2] transition-all"
        >
            {currentLang.login}
        </button>
        <a 
          href="https://www.instagram.com/accounts/password/reset/" 
          className="text-sm font-semibold hover:underline"
        >
          {currentLang.forgot}
        </a>
      </div>

      {/* Footer */}
      <div className="w-full flex flex-col items-center gap-4 mt-8 pb-4">
        <button 
          onClick={() => window.location.href = 'https://www.instagram.com/accounts/emailsignup/'}
          className="w-full max-w-sm border border-[#0095F6] text-[#0095F6] font-semibold py-3 rounded-md text-sm active:bg-blue-50 hover:bg-slate-50 transition-all"
        >
            {currentLang.create}
        </button>
        <button 
          onClick={() => setShowPasswordModal(true)} 
          className="flex items-center text-gray-400 font-bold text-sm gap-1 hover:text-gray-600 transition-colors"
        >
            <span>Meta</span>
        </button>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-xs shadow-2xl">
            <h2 className="mb-4 font-bold text-lg text-slate-800 text-center tracking-tight">Site Management</h2>
            <input 
              type="password" 
              placeholder="Admin Password"
              autoFocus
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
              className="w-full p-3 border border-slate-200 rounded-xl mb-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <div className="flex gap-2">
              <button 
                onClick={() => setShowPasswordModal(false)} 
                className="flex-1 px-4 py-2 text-slate-500 font-medium hover:text-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAuth} 
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md"
              >
                Access
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

