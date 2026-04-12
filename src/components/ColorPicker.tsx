import { COLORS } from '@/constants/colors'
import type { ColorConfig } from '@/constants/colors'
import type { ColorValue } from '@/types/note'
import { cn } from '@/lib/utils'

// カラーピッカーのプロパティ
interface ColorPickerProps {
  currentColor: ColorValue
  onSelect: (color: ColorValue) => void
  onClose: () => void
}

// 付箋の色を選択するコンポーネント
export function ColorPicker({ currentColor, onSelect, onClose }: ColorPickerProps) {
  return (
    <>
      {/* 背景クリックで閉じる */}
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <div className="color-picker absolute top-10 left-0 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-3 border border-white/50 z-20 min-w-max">
        <p className="text-xs text-gray-500 font-medium mb-2 px-1">色を選択</p>
        <div className="grid grid-cols-4 gap-2">
          {COLORS.map((color: ColorConfig) => (
            <button
              key={color.value}
              title={color.name}
              onClick={() => { onSelect(color.value); onClose() }}
              className={cn(
                'w-8 h-8 rounded-xl border-2 transition-all duration-200 hover:scale-110 hover:shadow-lg cursor-pointer',
                color.class,
                currentColor === color.value
                  ? 'border-gray-600 scale-110 shadow-md'
                  : 'border-white/50 hover:border-gray-300'
              )}
            />
          ))}
        </div>
      </div>
    </>
  )
}
