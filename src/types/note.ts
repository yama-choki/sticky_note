// 付箋の色の種類
export type ColorValue = 'sunshine' | 'sky' | 'mint' | 'rose' | 'lavender' | 'peach' | 'aqua' | 'cream'

// 付箋データの型定義
export interface Note {
  id: string
  content: string
  color: ColorValue
  position: { x: number; y: number }
  isPinned: boolean
  zIndex: number
  createdAt: number
}
