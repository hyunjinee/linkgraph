import React from 'react';
import { Verified } from 'lucide-react';
import { Alert } from 'antd';

import GradientBg from '~/app/components/GradientBg';
import LoginForm from '~/app/components/LoginForm';

const Login = () => {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* LEFT */}
      <div className="relative hidden w-1/2 lg:block">
        <GradientBg className="absolute left-0 top-0 h-full w-full" />
        <img src="/logo.png" className="absolute left-5 top-5 h-10 w-10" alt="logo" />
        <div className="absolute bottom-5 left-5 inline-flex items-center gap-1 rounded-lg border-2 border-white px-3 py-2 font-semibold text-white">
          <Verified width={18} height={18} />
          PURPLE ADMIN UI
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/2">
        <div className="relative flex h-full items-center justify-center">
          <section className="w-full px-5 pb-10 text-gray-800 sm:w-4/6 sm:px-0 md:w-3/6 lg:w-4/6 xl:w-3/6">
            <div className="mt-8 flex flex-col items-center justify-center px-2 sm:mt-0">
              <h2 className="inter mt-2 text-5xl font-bold leading-tight">LinkGraph</h2>
              <div className="mt-1 text-lg text-gray-400">Admin System</div>
            </div>
            <div className="mt-12 w-full px-2 sm:px-6">
              <LoginForm />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;
