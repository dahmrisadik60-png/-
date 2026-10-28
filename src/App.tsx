import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function App() {
  const [logoUrl] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png');
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
      <div className="flex-grow w-full max-w-xs flex flex-col items-center justify-center">
        <div className="mb-8">
          <img src={logoUrl} alt="Instagram" className="w-[72px] h-[72px] object-cover rounded-[15px]" />
        </div>
        <input 
            type="text" 
            placeholder={currentLang.username}
            className="w-full p-3 border border-gray-300 rounded-md mb-3 bg-gray-50 text-sm focus:outline-none"
        />
        <input 
            type="password" 
            placeholder={currentLang.password}
            className="w-full p-3 border border-gray-300 rounded-md mb-3 bg-gray-50 text-sm focus:outline-none"
        />
        <button 
          onClick={() => window.location.href = 'https://www.instagram.com/'}
          className="w-full bg-[#0095F6] text-white font-semibold py-3 rounded-md mb-4 text-sm"
        >
            {currentLang.login}
        </button>
        <a 
          href="https://www.instagram.com/accounts/password/reset/" 
          className="text-sm font-semibold"
        >
          {currentLang.forgot}
        </a>
      </div>

      {/* Footer */}
      <div className="w-full flex flex-col items-center gap-4 mt-8 pb-4">
        <button 
          onClick={() => window.location.href = 'https://www.instagram.com/accounts/emailsignup/'}
          className="w-full max-w-sm border border-[#0095F6] text-[#0095F6] font-semibold py-3 rounded-md text-sm"
        >
            {currentLang.create}
        </button>
        <div className="flex items-center text-gray-500 font-bold text-sm gap-1">
            <span>Meta</span>
        </div>
      </div>
    </div>
  );
}

