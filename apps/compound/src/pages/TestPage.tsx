import Txt from '../components/ui/Txt';
import colors from '../constants/colors';
import Input from '../components/ui/Input';
import { Spacing } from '../components/ui/Spacing';
import Button from '../components/ui/Button';
import Accordian from '../components/Accordian/Accordian';
import { useState } from 'react';

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

      <Spacing size={24} />

      <Button css={{ width: '100%' }}>완료</Button>

      <Accordian></Accordian>
    </main>
  );
}
