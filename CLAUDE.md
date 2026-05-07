# mini-commerce CLAUDE.md

## 기술 스택
- Next.js 15 App Router (Pages Router 사용 금지)
- next-cloudinary v6 (CldImage, CldUploadWidget)
- Zustand v5 + persist 미들웨어
- Tailwind CSS v4

## 폴더 구조
- src/app/ — App Router 페이지
- src/components/ — 재사용 컴포넌트
- src/store/ — Zustand 스토어 (cartStore.ts 하나만)
- src/data/ — 상품 mock JSON 데이터

## 필수 규칙
1. CldImage 래퍼 컴포넌트 파일은 반드시 'use client' 선언
   (CldImage는 내부적으로 useState 사용 — Server Component에서 직접 import 금지)
2. CldUploadWidget은 반드시 'use client' 컴포넌트에서만 사용
   (브라우저 DOM 의존 — SSR에서 실행 시 크래시 발생)
3. Zustand 장바구니 스토어는 skipHydration: true + useEffect rehydrate 패턴 사용
   (SSR hydration 불일치 방지)
4. Zustand store 접근은 반드시 'use client' 컴포넌트에서만
   (Server Component에서 useCartStore() 호출 금지)
5. Unsigned Preset 방식이므로 CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET은 추가하지 않는다
   (서버 서명 업로드를 구현할 때만 필요 — 이 프로젝트에서는 사용 안 함)

## 환경변수 규칙
- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME → 클라이언트 노출 허용 (CldImage, CldUploadWidget에 필요)
- NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET → 클라이언트 노출 허용 (Unsigned Preset 이름)
- CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET → 이 프로젝트에서 사용 안 함 (서버 서명 업로드 전용)

## 금지사항
- CldImage를 Server Component에 직접 import하지 않는다
- CldUploadWidget을 'use client' 없이 사용하지 않는다
- API Secret을 코드에 하드코딩하지 않는다
- 'use client' 없는 컴포넌트에서 useCartStore() 호출 금지
