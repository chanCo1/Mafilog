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

`메인페이지`
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/28cda7f4-714a-4603-9a90-2e3354febf6e" />
- 간략한 서비스 소개와 함께 `Amchart5`를 활용한 지도 미리보기를 볼 수 있습니다.
- 로그인 후 진행중인 여행이 있을 경우 오른쪽 하단에 여행 카드가 노출됩니다.

`회원가입`
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/16344614-2683-498d-ba57-c451c5605afe" />
- `React-Hook-Form` 과 `Zod`를 활용해 인풋 밸리데이션을 구현하였습니다.

`로그인`
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/069549c8-edf9-4edf-9215-234079171a9e" />
- 로그인 시 사용자 인증은 `NextAuth`를 사용하였습니다. 사용한 이유는 사용자 세션을 관리하고 보안적으로 유지하며, 간단한 설정으로 소셜 로그인 기능을 쉽게 구현할 수 있기 때문입니다.

`여행 만들기`
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/33c3eb23-f9f5-4476-b917-6b7507141a3a" />
- 지역 검색은 `GooglePlacesApi`를 사용하였고, 매필로그 서비스에서는 전세계 도시 검색 부분과 장소 검색 두 부분으로 나뉘어져 있기 때문에 도시 검색시에는 검색 데이터에서 분류가 city인 데이터만 필터해서 데이터를 가져옵니다

`일정 만들기`
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/ece88e33-9b9a-4f41-a954-9efe8e4a5232" />
- 장소 검색도 `GooglePlacesApi`를 사용하였고, 광범위하게 검색되는 내용에서 `TRANSPORT`, `FOOD`, `SHOPPING`, `TOUR`, `HOUSE`, `ETC`로 구분점을 나누어 api에서 주는 구분외에 자체적으로 카테고리를 생성하여 분류합니다.

`체크리스트 & 현지 정보`
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/86cd4f98-9b6e-4a74-9e36-5ffcf9fa134a" />
- 체크리스트 처럼 생성과 수정(체크)가 자주 일어나는 경우 `react-query`의 `useMutation`을 적용하여 낙관적 업데이트(UI에 먼저 변경사항 반영하고 api 요청은 후 처리)를 적용하였습니다.
- 현지 정보에 보여지는 환율은 `exchangerate-api`를 활용했습니다. 여행하는 국가의 국가코드로 구분하여 환율 정보를 가져옵니다.
- 날씨는 `visualcrossing-api`를 사용했고, 이 또한 국가코드로 구분하여 가져와 노출합니다.

`지출 내역 추가`
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/4ba21be5-8807-4e20-a8d9-4efc1a6fd57a" />
- 기본적으로 금액관련 계산은 백엔드에서 처리하는게 데이터 무결성에 맞는 방식이지만, 프론트엔드 포트폴리오 성격에 맞게 데이터베이스에는 지출 금액(환율 계산된 금액 포함)만 저장하고 해당 금액들을 불러와 프론트에서 계산을 처리합니다.
- 계산 로직은 hook으로 따로 분리하여 여러곳에 사용할 수 있게 하였습니다.
- 프론트에서 계산하면 지출내역 추가할 때 마다 따로 API를 호출할 필요없이 바로 계산되어 사용자가 볼 수 있다는 장점이 있지만, 프론트에서 계산하면 단순 View의 역할을 하기 때문에 데이터베이스에 따로 금액이 저장되지 않아 추후 지출내역 엑셀 다운로드나 데이터 무결성 등의 기능이 제한된다는 점이 있습니다.

`지출 통계 & 정산`
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/1eca5f34-12fd-425d-af4c-3c7dce48ab39" />
- 통계 표시는 `chart.js`를 활용하였고, 해당 지출내역에 대한 합(일정별, 카테고리별)을 프론트에서 계산하여 보여줍니다.
- 내 지출 보기는 지출자가 로그인한 사용자의 id와 같은 값을 필터하여 지출내역 합산을 보여줍니다.

`추억(지도) 채우기`
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/049766be-fe03-404e-9490-7fb654bfefd6" />
- `Amchart`에서 세계지도는 국가별로 구분되어 사용할 수 있지만, 국내 지도는 행정구역별로 구분해서 제공하기 때문에 시,군,구로 자세히 나뉘어져 있는 `geoJson`을 구해 라이브러리 json 성격에 맞춰 재가공하여 사용하였습니다.

`프로필 및 비밀번호 변경`
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/0a5383df-185b-4752-8097-264064ca3ae4" />
- 데이터베이스에 이미지 채로 저장하면 용량을 많이 차지하기 때문에 이미지 저장은 `cloudinary`를 활용하였습니다. 데이터베이스에는 cloudinary에 저장된 이미지 url만 텍스트로 저장합니다.

`여행 타임라인`
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/fc17ec23-1d85-4307-bdb9-5bb1132de7f2" />
- 페이지 진입 시에 타임라인 리스트를 호출하고, 리스트를 클릭할 때 해당 여행에 대한 상세 정보를 불러와 지출 내역을 보여줍니다.
- 타임라인에 노출되는 금액 관련 모두 프론트에 있는 계산 훅을 재사용합니다.

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

## 트러블 슈팅
### 1.
### 2. 
### 3. 

## 후기





















