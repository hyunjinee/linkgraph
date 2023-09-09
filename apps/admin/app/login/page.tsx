import { Alert } from 'antd';
import LoginForm from '~/components/LoginForm';

const Login = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="flex justify-center w-full lg:w-1/2">
        <section className="w-full px-5 sm:w-4/6 md:w-3/6 lg:w-4/6 xl:w-3/6 sm:px-0">
          {!process.env.NEXT_PUBLIC_API_ENDPOINT ? (
            <Alert
              message="환경변수 설정 오류"
              description={
                <span>
                  .env.example 파일을 복사하여 .env 파일을 생성해주세요.{' '}
                  <a
                    href="https://github.com/purpleio/purple-admin-ui#%EA%B8%B0%EB%B3%B8-%EC%84%A4%EC%A0%95"
                    target="_blank"
                    rel="noreferrer"
                  >
                    참고 링크
                  </a>
                </span>
              }
              type="error"
              showIcon
              className="my-10"
            />
          ) : null}

          <div className="flex items-center justify-center h-20">
            <h2 className="text-5xl font-bold leading-tight">ADMIN</h2>
          </div>

          <LoginForm />
        </section>
      </div>
    </div>
  );
};

export default Login;
