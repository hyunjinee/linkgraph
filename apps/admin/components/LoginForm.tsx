'use client';

import { Alert, Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

type LoginFormValue = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = useForm<LoginFormValue>();

  const handleLogin = async (value: LoginFormValue) => {
    setIsLoading(true);

    try {
      await signIn('login-credentials', { username: value.username, password: value.password });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* <div className="mb-3">
        <Alert message="로그인 중 오류가 발생했습니다." type="warning" />
      </div> */}

      <Form<LoginFormValue>
        form={form}
        layout="vertical"
        initialValues={{ username: 'admin', password: 'admin' }}
        onFinish={handleLogin}
      >
        <Form.Item name="username" rules={[{ required: true, message: '아이디를 입력해주세요' }]}>
          <Input size="large" placeholder="아이디" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}>
          <Input size="large" type="password" placeholder="비밀번호" />
        </Form.Item>

        <Button size="large" type="primary" htmlType="submit" className="w-full" loading={isLoading}>
          로그인
        </Button>

        <a></a>
      </Form>
    </>
  );
};

export default LoginForm;
