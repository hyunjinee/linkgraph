'use client';

import { Alert } from 'antd';
import { useForm } from 'antd/lib/form/Form';

type LoginFormValue = {
  username: string;
  password: string;
};

const LoginForm = () => {
  return (
    <>
      <Alert message="로그인 중 오류가 발생했습니다." type="warning" />
    </>
  );
};

export default LoginForm;
