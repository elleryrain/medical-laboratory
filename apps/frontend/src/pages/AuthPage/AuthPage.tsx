import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProfileIcon from '@svg/ProfileIcon.svg?react';
import Lock from '@svg/Lock.svg?react';
import EyeOpenIcon from '@svg/EyeOpenIcon.svg?react';
import EyeCloseIcon from '@svg/EyeCloseIcon.svg?react';
import BackgroundLeftRight from '@svg/BackgroundLeftRightAuth.svg?react';
import BackgroundTop from '@svg/BackgroundTopAuth.svg?react';

export const AuthPage = () => {
  const [checkPassword, setCheckPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({
      data: { email, password },
    });
  };

  return (
    <div className="flex justify-center items-center text-white min-h-screen">
      <div className="absolute flex top-0 left-0 right-0 bottom-0 z-[-1]">
        <BackgroundLeftRight className="z-[-1]" />
        <BackgroundTop className="z-[-1]" />
        <BackgroundLeftRight className="z-[-1] transform-[scaleX(-1)]" />
      </div>

      <div className="flex flex-col gap-[70px] w-[600px] mt-[18.5vh]">
        <div>
          <h1 className="text-[40px] font-medium">Добро пожаловать в</h1>
          <h1 className="text-[40px] font-medium text-[#BDFF67]">SmartLab</h1>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[30px]">
            <div className="flex items-center gap-[15px] bg-[#333333] rounded-[15px] px-[20px] py-[22px] h-[71px]">
              <ProfileIcon />
              <input
                className="bg-transparent outline-none text-2xl placeholder:text-[#B9B9B9] font-medium w-full"
                placeholder="Логин"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-[15px] bg-[#333333] rounded-[15px] px-[20px] py-[22px] h-[71px]">
              <Lock />
              <input
                className="bg-transparent outline-none text-2xl placeholder:text-[#B9B9B9] font-medium w-full"
                placeholder="Пароль"
                type={checkPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {checkPassword ? (
                <EyeCloseIcon
                  className="cursor-pointer select-none"
                  onClick={() => setCheckPassword(false)}
                />
              ) : (
                <EyeOpenIcon
                  className="cursor-pointer select-none"
                  onClick={() => setCheckPassword(true)}
                />
              )}
            </div>
          </div>

          {loginMutation.error && (
            <div className="bg-red-600 text-white rounded-[15px] p-4 text-center text-[18px] font-medium">
              {loginMutation.error.message}
            </div>
          )}

          <p className="cursor-pointer text-right text-[20px] font-medium">
            Забыли пароль?
          </p>

          <button
            className="cursor-pointer bg-white text-black rounded-[15px] h-[71px] text-[24px] font-medium hover:bg-[#BDFF67] transition duration-500 disabled:opacity-50"
            type="submit"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Входим...' : 'Вход'}
          </button>
        </form>
      </div>
    </div>
  );
};
