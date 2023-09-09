// class ErrorBoundary extends React.Component {
//   constructor(props: unknown) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   render() {
//     if (this.state.hasError) {
//       return this.props.fallback;
//     }

//     return this.props.children;
//   }
// }

/**
 * ErrorBoundary
 * 비동기 호출에 대한 에러처리, 하위 컴포넌트 트리에서 발생한 에러를 잡아서 선언적으로 처리
 * 렌더링 중에 throwe된 에러를 catch하도록 동작한다.
 * 더 나은 사용자 경험을 위해 에러 발생시 보여주는 컴포넌트에서 유저가 API 호출을 재시도하여
 * 에러를 리겟할 수 있는 트리거 장치를 둔다면?
 * 렌더링 중에 TypeError와 같이 예상치 못한 런타임 에러가 발생할 수 있다.
 *
 *
 * reference
 * - https://fe-developers.kakaoent.com/2022/221110-error-boundary/
 * - https://legacy.reactjs.org/docs/error-boundaries.html
 */
