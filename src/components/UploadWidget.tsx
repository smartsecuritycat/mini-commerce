'use client'

// CldUploadWidget은 브라우저 DOM에 의존 → 반드시 'use client' 컴포넌트에서만 사용
import { CldUploadWidget } from 'next-cloudinary'

type Props = {
  onUploadSuccess: (publicId: string) => void
}

export default function UploadWidget({ onUploadSuccess }: Props) {
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  // Cloudinary 미설정 시 안내 메시지
  if (!preset || preset === '여기에_Unsigned_Preset_이름') {
    return (
      <div className="border-2 border-dashed border-amber-200 bg-amber-50 rounded-2xl p-8 text-center">
        <p className="text-sm font-semibold text-amber-700 mb-1">Cloudinary 설정 필요</p>
        <p className="text-xs text-amber-600">
          .env.local의 <code className="font-mono bg-amber-100 px-1 rounded">NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET</code> 값을 설정해주세요.
        </p>
      </div>
    )
  }

  return (
    <CldUploadWidget
      uploadPreset={preset}
      options={{
        multiple: true,
        maxFiles: 10,
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
        maxFileSize: 5000000, // 5MB
        sources: ['local', 'url', 'camera'],
        language: 'ko',
        text: {
          ko: {
            or: '또는',
            menu: { files: '내 파일', web: 'URL로 업로드', camera: '카메라' },
            selection_counter: { image: '이미지 선택됨' },
            queue: {
              title: '업로드 대기',
              title_uploading_with_counter: '{{num}}개 업로드 중',
              title_uploading: '업로드 중',
            },
          },
        },
      }}
      onSuccess={(result) => {
        const info = result.info as { public_id?: string } | undefined
        if (info?.public_id) {
          onUploadSuccess(info.public_id)
        }
      }}
    >
      {({ open }) => (
        <button
          onClick={() => open()}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl
            bg-black text-white text-sm font-bold
            hover:bg-gray-800 active:scale-[0.97] transition-all duration-150"
        >
          {/* 업로드 아이콘 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 16 12 12 8 16" />
            <line x1="12" y1="12" x2="12" y2="21" />
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
          </svg>
          이미지 업로드
        </button>
      )}
    </CldUploadWidget>
  )
}
