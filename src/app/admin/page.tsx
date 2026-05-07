'use client'

import { useState, useEffect, useRef, FormEvent } from 'react'
import Link from 'next/link'
import { CldImage } from 'next-cloudinary'
import UploadWidget from '@/components/UploadWidget'

// ── 타입 ──────────────────────────────────────────────
type UploadedItem = {
  publicId: string
  uploadedAt: string // ISO string
}

// ── 상수 ──────────────────────────────────────────────
const MAX_FAIL = 3
const LOCK_SECONDS = 30

// ── 복사 버튼 ─────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard API 미지원 환경 폴백
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={[
        'shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200',
        copied
          ? 'bg-emerald-100 text-emerald-700'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
      ].join(' ')}
    >
      {copied ? '✓ 복사됨' : '복사'}
    </button>
  )
}

// ── 업로드된 이미지 카드 ───────────────────────────────
function UploadCard({ item }: { item: UploadedItem }) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const isConfigured = cloudName && cloudName !== '여기에_Cloud_Name'

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
      {/* 이미지 미리보기 */}
      <div className="aspect-square bg-gray-50 overflow-hidden">
        {isConfigured ? (
          <CldImage
            src={item.publicId}
            alt={item.publicId}
            width={280}
            height={280}
            crop="fill"
            gravity="auto"
            format="auto"
            quality="auto"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
            미리보기 없음
          </div>
        )}
      </div>

      {/* public_id + 복사 */}
      <div className="p-3">
        <p className="text-[10px] text-gray-400 mb-1.5">
          {new Date(item.uploadedAt).toLocaleTimeString('ko-KR')}
        </p>
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-2.5 py-1.5">
          <code className="text-xs text-gray-700 flex-1 truncate font-mono">
            {item.publicId}
          </code>
          <CopyButton text={item.publicId} />
        </div>
      </div>
    </div>
  )
}

// ── 비밀번호 게이트 화면 ───────────────────────────────
function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [failCount, setFailCount] = useState(0)
  const [lockUntil, setLockUntil] = useState<number | null>(null)
  const [countdown, setCountdown] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // 잠금 카운트다운
  useEffect(() => {
    if (!lockUntil) return
    const id = setInterval(() => {
      const remaining = Math.ceil((lockUntil - Date.now()) / 1000)
      if (remaining <= 0) {
        setLockUntil(null)
        setFailCount(0)
        setCountdown(0)
        setError('')
        inputRef.current?.focus()
      } else {
        setCountdown(remaining)
      }
    }, 200)
    return () => clearInterval(id)
  }, [lockUntil])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (lockUntil) return

    const correct = process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    if (pw === correct) {
      sessionStorage.setItem('admin_auth', 'ok')
      onAuth()
    } else {
      const next = failCount + 1
      setFailCount(next)
      setPw('')

      if (next >= MAX_FAIL) {
        const until = Date.now() + LOCK_SECONDS * 1000
        setLockUntil(until)
        setError(`비밀번호 ${MAX_FAIL}회 오류. ${LOCK_SECONDS}초 잠금됩니다.`)
      } else {
        setError(`비밀번호가 틀렸습니다. (${next}/${MAX_FAIL}회)`)
        inputRef.current?.focus()
      }
    }
  }

  const isLocked = !!lockUntil

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-black mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-lg font-black text-gray-900">관리자 로그인</h1>
          <p className="text-xs text-gray-400 mt-1">Mini Commerce 어드민</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            ref={inputRef}
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError('') }}
            placeholder="비밀번호 입력"
            disabled={isLocked}
            autoFocus
            className={[
              'w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all',
              isLocked
                ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                : error
                ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5',
            ].join(' ')}
          />

          {error && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span>⚠️</span>
              {isLocked ? `${error.split('.')[0]}. ${countdown}초 후 재시도 가능합니다.` : error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLocked || !pw}
            className={[
              'w-full py-3 rounded-xl text-sm font-bold transition-all duration-150',
              isLocked || !pw
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800 active:scale-[0.98]',
            ].join(' ')}
          >
            {isLocked ? `잠금 중 (${countdown}초)` : '입장하기'}
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-gray-100 text-center">
          <Link href="/" className="text-xs text-gray-400 hover:text-black transition-colors">
            ← 쇼핑몰로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── 어드민 대시보드 ─────────────────────────────────────
function AdminDashboard() {
  const [uploads, setUploads] = useState<UploadedItem[]>([])

  const handleUploadSuccess = (publicId: string) => {
    setUploads((prev) => [
      { publicId, uploadedAt: new Date().toISOString() },
      ...prev,
    ])
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-base font-black tracking-[0.15em] uppercase text-black">
              Mini Commerce
            </Link>
            <span className="px-2 py-0.5 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-wider">
              Admin
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-400 hover:text-black transition-colors"
          >
            로그아웃
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* 탭 내비게이션 */}
        <div className="flex gap-1 border-b border-gray-100">
          <Link
            href="/admin"
            className="px-4 py-2.5 text-sm font-semibold border-b-2 border-black text-black -mb-px"
          >
            이미지 관리
          </Link>
          <Link
            href="/admin/analytics"
            className="px-4 py-2.5 text-sm font-semibold border-b-2 border-transparent text-gray-400 hover:text-gray-700 -mb-px transition-colors"
          >
            이벤트 분석
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">상품 이미지 관리</h1>

        {/* ── 업로드 섹션 ── */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-1">이미지 업로드</h2>
          <p className="text-xs text-gray-400 mb-5">
            JPG · PNG · WEBP 파일, 파일당 최대 5MB. 여러 장 동시 업로드 가능합니다.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <UploadWidget onUploadSuccess={handleUploadSuccess} />
            {uploads.length > 0 && (
              <p className="text-sm text-gray-500">
                이번 세션 <span className="font-bold text-black">{uploads.length}장</span> 업로드됨
              </p>
            )}
          </div>

          {/* 사용 안내 */}
          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700 space-y-1 leading-relaxed">
            <p className="font-semibold">📋 products.ts 연결 방법</p>
            <p>1. 아래 업로드 목록에서 원하는 이미지의 <strong>public_id를 복사</strong>하세요.</p>
            <p>2. <code className="font-mono bg-blue-100 px-1 rounded">src/data/products.ts</code> 파일을 열어</p>
            <p>3. 해당 상품의 <code className="font-mono bg-blue-100 px-1 rounded">cloudinaryId</code> 필드에 붙여넣으세요.</p>
            <p className="text-blue-500">예시: cloudinaryId: &#39;products/tshirt-basic-logo-abc123&#39;</p>
          </div>
        </section>

        {/* ── 업로드 목록 ── */}
        {uploads.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-gray-900 mb-4">
              업로드한 이미지 ({uploads.length}장)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {uploads.map((item) => (
                <UploadCard key={`${item.publicId}-${item.uploadedAt}`} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* ── 상품 목록 참조 ── */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-4">상품별 cloudinaryId 현황</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 pr-4 text-gray-400 font-medium">상품명</th>
                  <th className="text-left py-2 pr-4 text-gray-400 font-medium">카테고리</th>
                  <th className="text-left py-2 text-gray-400 font-medium">현재 cloudinaryId</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {PRODUCT_ROWS.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 pr-4 font-medium text-gray-800">{p.name}</td>
                    <td className="py-2.5 pr-4 text-gray-400">{p.category}</td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <code className="font-mono text-gray-500">{p.cloudinaryId}</code>
                        <CopyButton text={p.cloudinaryId} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

// ── 상품 참조 데이터 (admin 페이지 전용 — 서버 import 없이 인라인) ──
const PRODUCT_ROWS = [
  { id: 'ts-001', name: '베이직 로고 티셔츠', category: 'tshirt', cloudinaryId: 'products/tshirt-basic-logo' },
  { id: 'ts-002', name: '스트라이프 오버핏 티셔츠', category: 'tshirt', cloudinaryId: 'products/tshirt-stripe-overfit' },
  { id: 'ts-003', name: '그래픽 프린트 티셔츠', category: 'tshirt', cloudinaryId: 'products/tshirt-graphic-print' },
  { id: 'hd-001', name: '클래식 집업 후드', category: 'hoodie', cloudinaryId: 'products/hoodie-classic-zipup' },
  { id: 'hd-002', name: '오버사이즈 풀오버 후드', category: 'hoodie', cloudinaryId: 'products/hoodie-oversize-pullover' },
  { id: 'hd-003', name: '크루넥 스웨트셔츠', category: 'hoodie', cloudinaryId: 'products/hoodie-crewneck' },
  { id: 'mg-001', name: '로고 세라믹 머그', category: 'mug', cloudinaryId: 'products/mug-ceramic-logo' },
  { id: 'mg-002', name: '미니멀 텀블러', category: 'mug', cloudinaryId: 'products/mug-tumbler' },
  { id: 'mg-003', name: '더블월 유리 머그', category: 'mug', cloudinaryId: 'products/mug-glass-double' },
  { id: 'bg-001', name: '캔버스 토트백', category: 'bag', cloudinaryId: 'products/bag-canvas-tote' },
  { id: 'bg-002', name: '미니 크로스백', category: 'bag', cloudinaryId: 'products/bag-mini-cross' },
  { id: 'bg-003', name: '지퍼 파우치', category: 'bag', cloudinaryId: 'products/bag-zip-pouch' },
]

// ── 메인 페이지 — 인증 분기 ─────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [checked, setChecked] = useState(false)

  // sessionStorage는 브라우저에서만 사용 가능 — useEffect에서 확인
  useEffect(() => {
    const ok = sessionStorage.getItem('admin_auth') === 'ok'
    setAuthed(ok)
    setChecked(true)
  }, [])

  // 인증 확인 전 빈 화면 (hydration 불일치 방지)
  if (!checked) return null

  if (!authed) {
    return <PasswordGate onAuth={() => setAuthed(true)} />
  }

  return <AdminDashboard />
}
