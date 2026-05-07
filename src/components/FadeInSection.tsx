'use client'

import { useRef, useEffect, useState } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  /** 트랜지션 시작 지연 (ms). 여러 섹션을 순서대로 등장시킬 때 사용 */
  delay?: number
  /** 화면에 몇 % 들어왔을 때 시작할지 (0~1) */
  threshold?: number
}

export default function FadeInSection({
  children,
  className = '',
  delay = 0,
  threshold = 0.1,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el) // 한 번 보이면 옵저빙 중단
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div
      ref={ref}
      className={[
        'transition-all duration-700 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
        className,
      ].join(' ')}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
