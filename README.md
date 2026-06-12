<img src="https://mafilog-app.vercel.app/mafilog_thumbnail.png" />

# ✈️ Mafilog : 매필로그 🗺️

**Map · Fill · Log** — 지도에 색칠하듯 여행을 기록하는 웹 서비스

## 매필로그란?

> - 여행 계획의 고질적인 불편함인 동선짜기와 복잡한 여행 경비 정산을 한 곳에서 해결하기 위해 만들어진 서비스 입니다.
> - 검색을 통해 여행 일정을 만들고 일정 특성에 맞는 체크리스트와 여행하는 국가의 환율을 자동으로 계산해 지출 내역을 관리할 수 있습니다.
> - 지출 내역 관리 뿐 아니라 함께 여행한 친구들의 지출 내역을 바탕으로 바로바로 정산 내역을 계산합니다.
> - 또한, 내 여행 일정과 함께 지도를 색칠하고 기록하여 추억을 채울 수 있습니다. 지도를 색칠하면서 여행도하고 성취감도 얻을 수 있습니다.
> - 내가 지금까지 여행을 다니면서 어디에, 며칠동안, 지출한 금액이 얼마인지 궁금할 때는 타임라인으로 지금까지 여행했던 도시와 지출내역을 확인할 수 있습니다.

**서비스 배포**: [Mafilog:매필로그 서비스 페이지](https://mafilog-app.vercel.app)  
**기획**: [Mafilog 기획 피그마](https://www.figma.com/design/RibAatqQvdD7BsXfOgzggs/Mafilog?node-id=0-1&p=f)

### 테스트 계정
ID: test@test.com  
PW: 123qwe!@#

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
<br />
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/28cda7f4-714a-4603-9a90-2e3354febf6e" />
- 간략한 서비스 소개와 함께 `Amchart5`를 활용한 지도 미리보기를 볼 수 있습니다.
- 로그인 후 진행중인 여행이 있을 경우 오른쪽 하단에 여행 카드가 노출됩니다.

`회원가입`
<br />
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/16344614-2683-498d-ba57-c451c5605afe" />
- `React-Hook-Form` 과 `Zod`를 활용해 인풋 밸리데이션을 구현하였습니다.

`로그인`
<br />
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/069549c8-edf9-4edf-9215-234079171a9e" />
- 로그인 시 사용자 인증은 `NextAuth`를 사용하였습니다. 사용한 이유는 사용자 세션을 관리하고 보안적으로 유지하며, 간단한 설정으로 소셜 로그인 기능을 쉽게 구현할 수 있기 때문입니다.

`여행 만들기`
<br />
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/33c3eb23-f9f5-4476-b917-6b7507141a3a" />
- 지역 검색은 `GooglePlacesApi`를 사용하였고, 매필로그 서비스에서는 전세계 도시 검색 부분과 장소 검색 두 부분으로 나뉘어져 있기 때문에 도시 검색시에는 검색 데이터에서 분류가 city인 데이터만 필터해서 데이터를 가져옵니다

`일정 만들기`
<br />
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/ece88e33-9b9a-4f41-a954-9efe8e4a5232" />
- 장소 검색도 `GooglePlacesApi`를 사용하였고, 광범위하게 검색되는 내용에서 `TRANSPORT`, `FOOD`, `SHOPPING`, `TOUR`, `HOUSE`, `ETC`로 구분점을 나누어 api에서 주는 구분외에 자체적으로 카테고리를 생성하여 분류합니다.

`체크리스트 & 현지 정보`
<br />
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/86cd4f98-9b6e-4a74-9e36-5ffcf9fa134a" />
- 체크리스트 처럼 생성과 수정(체크)가 자주 일어나는 경우 `react-query`의 `useMutation`을 적용하여 낙관적 업데이트(UI에 먼저 변경사항 반영하고 api 요청은 후 처리)를 적용하였습니다.
- 현지 정보에 보여지는 환율은 `exchangerate-api`를 활용했습니다. 여행하는 국가의 국가코드로 구분하여 환율 정보를 가져옵니다.
- 날씨는 `visualcrossing-api`를 사용했고, 이 또한 국가코드로 구분하여 가져와 노출합니다.

`지출 내역 추가`
<br />
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/4ba21be5-8807-4e20-a8d9-4efc1a6fd57a" />
- 기본적으로 금액관련 계산은 백엔드에서 처리하는게 데이터 무결성에 맞는 방식이지만, 프론트엔드 포트폴리오 성격에 맞게 데이터베이스에는 지출 금액(환율 계산된 금액 포함)만 저장하고 해당 금액들을 불러와 프론트에서 계산을 처리합니다.
- 계산 로직은 hook으로 따로 분리하여 여러곳에 사용할 수 있게 하였습니다.
- 프론트에서 계산하면 지출내역 추가할 때 마다 따로 API를 호출할 필요없이 바로 계산되어 사용자가 볼 수 있다는 장점이 있지만, 프론트에서 계산하면 단순 View의 역할을 하기 때문에 데이터베이스에 따로 금액이 저장되지 않아 추후 지출내역 엑셀 다운로드나 데이터 무결성 등의 기능이 제한된다는 점이 있습니다.

`지출 통계 & 정산`
<br />
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/1eca5f34-12fd-425d-af4c-3c7dce48ab39" />
- 통계 표시는 `chart.js`를 활용하였고, 해당 지출내역에 대한 합(일정별, 카테고리별)을 프론트에서 계산하여 보여줍니다.
- 내 지출 보기는 지출자가 로그인한 사용자의 id와 같은 값을 필터하여 지출내역 합산을 보여줍니다.

`추억(지도) 채우기`
<br />
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/049766be-fe03-404e-9490-7fb654bfefd6" />
- `Amchart`에서 세계지도는 국가별로 구분되어 사용할 수 있지만, 국내 지도는 행정구역별로 구분해서 제공하기 때문에 시,군,구로 자세히 나뉘어져 있는 `geoJson`을 구해 Amchart 라이브러리 json 성격에 맞춰 재가공하여 사용하였습니다.

`프로필 및 비밀번호 변경`
<br />
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/0a5383df-185b-4752-8097-264064ca3ae4" />
- 데이터베이스에 이미지 채로 저장하면 용량을 많이 차지하기 때문에 이미지 저장은 `cloudinary`를 활용하였습니다. 데이터베이스에는 cloudinary에 저장된 이미지 url만 텍스트로 저장합니다.

`여행 타임라인`
<br />
<img width="500" height="300" alt="Image" src="https://github.com/user-attachments/assets/fc17ec23-1d85-4307-bdb9-5bb1132de7f2" />
- 페이지 진입 시에 타임라인 리스트를 호출하고, 리스트를 클릭할 때 해당 여행에 대한 상세 정보를 불러와 지출 내역을 보여줍니다.
- 타임라인에 노출되는 금액 관련 모두 프론트에 있는 계산 훅을 재사용합니다.

## 트러블 슈팅

### 1. 서드파티 API 사용에 따른 과금 정책 문제

`Mafilog` 서비스는 전 세계의 데이터(장소, 지도, 환율, 날씨)를 필요로 하는 프로젝트입니다.

따라서 Google에서 제공하는 장소 정보 `Google Places Api`, 지도 정보 `Google Maps Api`와 환율 정보를 제공하는 `Exchangerate Api`, 날씨 정보를 제공하는 `Visualcrossing Api`, 이미지 업로드에 필요한 `Cloudinary` 가 사용 되었습니다.

사용된 api들은 모두 일정 범위 내에서 무료로 사용 가능하고, 제공되는 무료 범위를 초과하면 요금이 부과되는 형태입니다.

따라서 이 정책에 맞춰 한번 사용한 데이터는 최대한 재사용할 수 있게 개발 방향을 잡아야 했습니다.

#### 문제
대부분의 api 호출은 `React-qeury`의 `staleTime`과 `gcTime`으로 캐싱하여 한번 호출한 api를 재사용함으로 해결하였지만, `Google Maps Api`의 경우 지도가 로드(DOM에 인스턴스 생성) 될 때마다 호출 비용이 부과되는 정책이라 GoogleMap이 사용된 `장소 등록 모달` 또는 `추억 상세 모달`을 사용 할 때 마다 호출 비용이 급증하는 낭비가 발생하였습니다.

#### 원인
1. 슬라이드 되는 애니메이션 적용을 위해 화면 오른쪽에 모달을 숨겨두었으나 사용자가 모달을 사용하지 않았음에도 페이지 최초 진입시 부터 모달이 mount 되어 GoogleMap 인스턴스가 발생되었습니다.

2. 따라서 처음에는 unMount 상태로 있다가 호출 시 Dom에 Mount된 후 슬라이드 애니메이션으로 노출, 미사용시에는 unMount로 DOM에서 제거 형태로 변경 하였으나 모달을 열고 닫을 때 마다 GoogleMap 인스턴스가 반복 생성되었습니다.

#### 해결
- Singleton Modal 아키텍처를 도입해 모달의 열고 닫음과 내부 데이터를 `zustand`로 관리하고, 모달 인스턴스를 페이지 단위가 아닌 루트 레이아웃(Root Layout)에서 관리해 서비스 생명주기와 동기화 하였습니다.

- `hasMounted` 플래그를 도입해 (초기 **false**) 페이지 진입시에 모달이 unMount 상태로 있다가 최초 모달 1회 호출 시 플래그를 활성화 시켜 전역 상태로 모달이 항상 오른쪽에 숨겨져 있는 상태로 변경하였습니다.

- 이에 맞춰 GoogleMap은 최초 1회만 생성되고 서비스 생명주기를 따라 반복 생성 없이 호출 비용을 절약할 수 있습니다.

<details>
  <summary>코드 보기</summary>

  <div markdown="1">

    ```javascript
      import { create } from 'zustand';
      import { IScheduleResponse } from '@/features/myTravel/interfaces/schedule.interface';

      interface ModalState {
        isOpen: boolean;
        hasMounted: boolean;
        scheduleList: IScheduleResponse[];
        open: (scheduleList: IScheduleResponse[]) => void;
        close: () => void;
      }

      export const useAddPlaceModalStore = create<ModalState>((set) => ({
        isOpen: false,
        hasMounted: false,
        scheduleList: [],
        open: (scheduleList) => set({ isOpen: true, hasMounted: true, scheduleList }),
        close: () => set({ isOpen: false }),
      }));
    ```

  </div>

</details>

### 2. 모바일 웹에서 터치 불능 문제

`Mafilog`는 웹이 주 타겟이지만, 모바일 웹에서도 접속 가능하기에 문제 없이 서비스가 돌아가야 하고, 추후 React-native 웹뷰를 통해 앱으로도 만들 예정이기에 모바일에서의 호환성이 중요했습니다.

#### 문제
웹에서는 버튼 클릭 이벤트가 문제없이 작동하는 반면, 모바일 웹(크롬 등) 환경에서 버튼 터치 이벤트가 작동하지 않고 아무 반응이 없어 페이지 스크롤 외에 모든 기능이 안되는 장애가 발생하였습니다.

#### 원인
1. 최신 기술 스택을 적용하고자 `Next 16`과 `react 19` 버전을 도입하였으나 Next 16 버전으로 올라가면서 핵심 렌더링 엔진(React 19 기반 체계 포함) 및 번들러 방식이 변경되어 내부의 웹킷 기반 웹뷰 엔진이 Next 16의 특정 자바스크립트 실행 방식이나 폴리필 미지원 코드를 해석하지 못하는 크로스 브라우징 이슈가 원인으로 판단 되었습니다.

#### 해결
- 구체적인 원인 파악과 해결 방안 모색으로 인해 발생되는 리스크(시간 및 추후 발생되는 사이드 이펙트)가 너무 크다고 판단되어, 서비스의 안정성을 최우선으로 생각해 신속하게 다운그레이드를 결정하였습니다.
  
- Next 16 버전에서 안정성이 검증된 `Next 14` 버전으로 다운그레이드 하였고, React 또한 `React 18` 버전으로 다운그레이드 하였습니다.

- 다운그레이드를 결정 후 모바일 웹에서 확인해 본 결과 버튼 터치 등이 문제없이 작동 되는것을 확인하였습니다.

### 3. 가계부 지출 계산 시 서버 상태(React Query)와 클라이언트 상태(Zustand) 중복 존재
지출 내역 계산을 프론트에서 처리하여 보여주기 위해 데이터베이스에는 지출 금액 원본만 저장하고 지출 내역을 기반으로 복잡한 계산 로직이 필요했고, 사용자에게 빠른 계산 처리를 보여주기 위해 낙관적 업데이트가 필요했습니다. 이를 위해 `Zustand` 전역 스토어 내부에 `get()`을 활용하여 데이터를 참조하는 다수의 계산 함수를 구현해 둔 상태였습니다.

#### 문제
API 통신을 통해 데이터 호출은 `React Query`에서 가져오고 있으나 계산 로직은 `Zustand`에서 처리하고 있었습니다. 이로 인해 같은 데이터 두 곳으로 나뉘어져 지출내역이 업데이트 될 때 마다 Zustand의 전역 상태도 수동으로 동기화해야 하는 이중 작업이 발생하였습니다.

계산해야할 항목들이 많아지고 지출 내역의 생성, 수정, 삭제가 빈번해지고 있어 낙관적 업데이트의 복잡도가 증가하여 React Query의 데이터와 Zustand의 데이터가 정확하게 연결되지 않아 UI 갱신 시 데이터가 꼬이는 케이스가 발견되었습니다. 

#### 원인
1. 빠른 계산 처리와 낙관적 업데이트가 필요해 React Query를 단순 데이터를 가져오는 연결 통로로 사용해 원본 데이터를 다시 전역상태로 저장하여 같은 데이터를 이중 처리하는 불필요한 과정에서 비롯되었습니다.

#### 해결
- Zustand에 종속되어 있던 비즈니스 로직을 걷어내고, React Query의 캐시 데이터를 직접 주입받아 계산하는 순수 함수 기반의 커스텀 훅 `useExpenseCalculator`으로 구조를 리팩토링했습니다. 데이터 패치과 상태 보관은 React Query가 담당하고, 커스텀 훅은 순수하게 계산 역할만 수행하도록 의존성을 분리했습니다.

- 커스텀 훅으로 분리에서 그치지 않고 메모이제이션을 적극 활용하여 렌더링 성능도 최적화 하였습니다. 파라미터가 필요한 동적 연산에는 `useCallback`을 사용해 함수 자체를 메모이제이션하여 불필요한 호출을 막았고, 파라미터 없이 계산을 담당하는 함수는 `useMemo`를 사용하여 결과값 자체를 캐싱하여 사용했습니다. 

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





















