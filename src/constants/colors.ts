import type { ColorValue } from '@/types/note'

// 付箋の色設定
export interface ColorConfig {
  name: string
  value: ColorValue
  class: string
  accent: string
}

export const COLORS: ColorConfig[] = [
  { name: 'サンシャイン', value: 'sunshine', class: 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-300/30', accent: '#FCD34D' },
  { name: 'スカイ', value: 'sky', class: 'bg-gradient-to-br from-sky-100 to-blue-200 border-blue-300/30', accent: '#7DD3FC' },
  { name: 'ミント', value: 'mint', class: 'bg-gradient-to-br from-emerald-100 to-green-200 border-green-300/30', accent: '#6EE7B7' },
  { name: 'ローズ', value: 'rose', class: 'bg-gradient-to-br from-rose-100 to-pink-200 border-pink-300/30', accent: '#FDA4AF' },
  { name: 'ラベンダー', value: 'lavender', class: 'bg-gradient-to-br from-violet-100 to-purple-200 border-purple-300/30', accent: '#C4B5FD' },
  { name: 'ピーチ', value: 'peach', class: 'bg-gradient-to-br from-orange-100 to-amber-200 border-amber-300/30', accent: '#FCA5A1' },
  { name: 'アクア', value: 'aqua', class: 'bg-gradient-to-br from-teal-100 to-cyan-200 border-cyan-300/30', accent: '#5EEAD4' },
  { name: 'クリーム', value: 'cream', class: 'bg-gradient-to-br from-stone-100 to-neutral-200 border-neutral-300/30', accent: '#D6D3D1' },
]

// ピン留め可能な最大数
export const MAX_PINNED_NOTES = 3
