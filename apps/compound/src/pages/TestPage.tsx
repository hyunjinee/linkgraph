import React from 'react';
import Txt from '../components/ui/Txt';
import colors from '../constants/colors';
import Input from '../components/ui/Input';
import { Spacing } from '../components/ui/Spacing';

export default function TestPage() {
  return (
    <main>
      <Txt typography="h1" color={colors.black}>
        테스트 페이지
      </Txt>

      <Input label="아이디">
        <Input.TextFeild />
      </Input>

      <Spacing size={24} />

      <Input label="비밀번호">
        <Input.TextFeild />
      </Input>
    </main>
  );
}
