# <img height="25px" src="https://github.com/hyunjinee/linkgraph/assets/63354527/2612509a-975a-4ee7-a1b8-5be464444a74" /> LinkGraph(WIP🔨)

유저가 자신을 소개하는 링크를 업로드하면 그래프 형태로 시각화해서 공유할 수 있는 서비스입니다.

<div style="display: flex;">
  <img width="391" height="400" align="top" alt="image" src="https://github.com/hyunjinee/linkgraph/assets/63354527/85103dc0-f6d1-4e85-a4c0-62a2c50ef838">
  <img width="391" height="400" align="top" alt="image" src="https://github.com/hyunjinee/linkgraph/assets/63354527/76963e11-fddd-43ad-945c-88cc4b99310b">
</div>

## 서비스 아키텍처

![image](https://github.com/hyunjinee/linkgraph/assets/63354527/9d9c9450-782a-42af-a117-0477d43f05fc)

- S3에 이미지를 업로드할 때는 PresignedURL 방식을 사용하였고, 이미지를 브라우저에서 불러올 때는 CloudFront를 사용하였습니다.

## 프로젝트에서 배운 것 기록

- [서버 사이드 렌더링으로 UX 개선하기](https://www.youtube.com/watch?v=wxxNS6hEptE)

<!-- ## TODO

- 모노레포
- React Props. Type or Interface?
- 서버 컴포넌트
- HTTP Method 멱등성 (DELETE) -->

<!-- ## 왜 이 기술을 선택했는가?

- Next.js
  - React 기반 프로젝트에서 ISR, SSR, CSR 다양한 렌더링 패턴을 적용할 수 있다.
  - 서버 컴포넌트를 적절히 사용하여 번들 사이즈를 줄일 수 있다.
  - Vercel을 활용한 쉽고 빠른 CD
- -->
