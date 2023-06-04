# LinkGraph

![Vector](https://github.com/hyunjinee/linkgraph/assets/63354527/6d4cacbd-577f-44e6-bbbb-24554ceff58d)

링크들을 그래프 형태로 나타내보자.

1. 사람과 연결된 링크를 그래프형태로 표현한다.
2. 사람들과의 관계를 그래프형태로 표현한다.

## 서비스 아키텍처

![image](https://github.com/hyunjinee/linkgraph/assets/63354527/36ca1fcb-d4bd-4298-b09c-6219a78a8c47)

## 사용자 스토리

- 사용자는 메인화면에서 로그인을 할 수 있어야 한다. (현재는 구글 로그인을 제공.)
- 사용자는 로그아웃을 할 수 있다.
- 사용자는 회원탈퇴를 할 수 있다.
- 사용자는 마이페이지에서 자신의 URL 로 사용할 이름(닉네임)을 정할 수 있다. (ex. /hyunjin)
- 사용자는 마이페이지에서 그래프들의 루트 노드에 해당하는 자신의 프로필 사진을 업로드할 수 있다.
- 사용자는 마이페이지에서 자신의 링크를 추가할 수 있다.
- 사용자는 마이페이지에서 자신의 링크에 사진을 추가할 수 있다.(링크 썸네일)
- 사용자는 마이페이지에서 자신의 링크를 삭제할 수 있다.
- 사용자가 추가한 링크는 그래프 형태로 연결되어서 보여지게 된다.
- 사용자는 /hyunjin 과 같은 URL로 접근하여 기존에 추가한 그래프 형태로 연결된 링크들을 볼 수 있다.
- 사용자는 메인 화면에서 다른 사용자를 검색할 수 있어야 한다.

## TODO

- EsLint 설정 공통 프로젝트
- tsconfig 설정 공통 프로젝트
- 개인당 링크 연결 30개 제한
