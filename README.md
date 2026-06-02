<img src="https://mafilog-app.vercel.app/mafilog_thumbnail.png" />

# ✈️ Mafilog : 매필로그 🗺️

**Map · Fill · Log** — 지도에 색칠하듯 여행을 기록하는 웹 서비스

## 매필로그란?

> 여행 계획의 고질적인 불편함인 동선짜기와 복잡한 여행 경비 정산을 한 곳에서 해결하기 위해 만들어진 서비스 입니다.
> <br />
> <br />
> 검색을 통해 여행 일정을 만들고 일정 특성에 맞는 체크리스트와 여행하는 국가의 환율을 자동으로 계산해 지출 내역을 관리할 수 있습니다.
> <br />
> <br />
> 또한, 내 여행 일정과 함께 지도를 색칠하고 기록하여 추억을 채울 수 있습니다. 지도를 색칠하면서 여행도하고 성취감도 얻을 수 있습니다.
> <br />
> <br />
> 내가 지금까지 여행을 다니면서 어디에, 며칠동안, 지출한 금액이 얼마인지 궁금할 때는 타임라인으로 지금까지 여행했던 도시와 지출내역을 확인할 수 있습니다.

**서비스 배포**: [Mafilog:매필로그 서비스 페이지](https://mafilog-app.vercel.app)  
**기획**: [Mafilog 기획 피그마](https://www.figma.com/design/RibAatqQvdD7BsXfOgzggs/Mafilog?node-id=0-1&p=f)

---

## 포트폴리오 소개

### 개발 기간
기획: 2026년 4월 1일 ~ 2026년 4월 18일 (약 3주)
<br />
개발: 2026년 4월 19일 ~ 2026년 5월 31일 (약 6주)

### 프로젝트 참여 인원
`박찬우` (1명, 개인 프로젝트) [chanCo](https://github.com/chanCo1)

### 기술 스택

- 언어: **TypeScript**
- 프레임워크: **Next.js 14 (App Router) / React 18**
- 스타일: **Tailwind CSS v4, CVA, Lucide-Icon**
- 유효성 검증: **React Hook Form, Zod**
- 클라이언트 상태 관리: **Zustand**
- 서버 상태 관리: **TanStack React Query v5**
- 백엔드 서버: **Next.js Route Handlers, Prisma 7**
- 데이터베이스: **Neon (PostgreSQL)**
- 서버 통신: **Axios**
- 인증 관리: **NextAuth 5, JWT, bcryptjs**
- 기획 및 디자인: **Figma**
- 배포: **Vercel**
- 패키지 매니저: **Yarn 1.22**

#### 그외
- 지도 및 차트: **AmCharts 5, chart.js**
- 구글 맵: **Google Map Javascript (@vis.gl/react-google-maps)**
- 구글 검색: **Google Places API (New)**
- 전세계 국가 정보: **world-countries**
- 날씨 정보: **visualcrossing-api**
- 환율 정보: **exchangerate-api**
- 이미지 업로드: **Cloudinary**

#### Node Version
v22.22.0

### 프로젝트 구조

- 서비스 규모의 확장과 레이어 간의 단방향 의존성을 보장하기 위해 `Feature-Driven Design` 구조를 채택하여 설계하였습니다.
- 프로젝트 페이지별 필요한 기능 구현은 `features` 폴더에서 이루어집니다.
- 공통으로 사용되는 기능은 `shared` 폴더에서 진행됩니다. (ex. UI 컴포넌트)

```
mafilog/
├── prisma/                    # ORM 모델 생성
├── public/                    # 정적 지도 데이터 및 이미지
├── src/
│   ├── app/                   # App Router 페이지·API
│   │   ├── (publicGroup)/     # 인증 없이 접속 가능 그룹
│   │   ├── (privateGroup)/    # 인증 없이는 접속 불가능 그룹
│   │   └── api/               # REST Route Handlers
│   ├── features/              # 기능 단위 모듈
│   │   ├── auth/              
│   │   ├── home/              
│   │   ├── myTravel/          
│   │   ├── myMap/             
│   │   └── myPage/            
│   ├── shared/                # 공통적으로 사용될 컴포넌트 및 훅 등
│   │   ├── components/        
│   │   ├── hooks/             
│   │   ├── services/          
│   │   ├── lib/               
│   │   ├── backend/           # 백엔드에 사용할 유틸 함수 등
│   │   ├── stores/            # 클라이언트 전역 관리
│   │   └── styles/            
│   └── middleware.ts          # 비로그인 시 private 라우트 차단
└── package.json
```

### 주요 기능

- `회원가입`
![image](https://github.com/.../이미지주소.gif)
- `로그인 & 로그아웃`
- `여행 만들기`
- `일정 만들기`
- `지출 내역 추가`
- `지출 통계`
- `지출 정산`
- `현지 정보`
- `추억(지도) 채우기`
- `프로필 및 비밀번호 변경`
- `여행 타임라인`
- `내 여행 통계`

### Git 브랜치 전략
- `main`: upstream 브랜치, 실제 사용자에게 배포될 브랜치
- `develop`: main 브랜치에 머지 전, 모든 작업 브랜치들을 합쳐 확인해 보는 브랜치
- `feature`: 기능 단위 작업 브랜치
  
```
- 예시
feature/add-loginpage
```

### Commit 메시지 전략
- `ADD`: 기능이 추가될 때
- `UPD`: 추가된 기능 업데이트
- `CHG`: 기획 변경 (기능 변경)
- `DEL`: 파일 및 기능 제거

```
- 예시
ADD: 로그인 페이지 버튼 추가
UPD: 로그인 페이지 버튼명 수정
CHG: 버튼 위치 상단으로 변경
DEL: 로그인 페이지 버튼 제거
```

---

## 트러블 슈팅
### 1. 
### 2. 

## 후기





















