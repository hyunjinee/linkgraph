'use client';

import { Alert, Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useState } from 'react';

type LoginFormValue = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Alert message="로그인 중 오류가 발생했습니다." type="warning" />

      <Form<LoginFormValue>>
        <Form.Item name="username" rules={[{ required: true, message: '아이디를 입력해주세요' }]}>
          <Input size="large" placeholder="아이디" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}>
          <Input size="large" type="password" placeholder="비밀번호" />
        </Form.Item>

        <Button size="large" type="primary" htmlType="submit" className="w-full" loading={isLoading}>
          로그인
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
