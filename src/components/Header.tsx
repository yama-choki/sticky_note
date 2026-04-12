import { Plus, StickyNote as StickyNoteIcon, Pin } from 'lucide-react'
import { MAX_PINNED_NOTES } from '@/constants/colors'

// ヘッダーコンポーネントのプロパティ
interface HeaderProps {
  noteCount: number
  pinnedCount: number
  onAddNote: () => void
}

// アプリのヘッダーコンポーネント
export function Header({ noteCount, pinnedCount, onAddNote }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm z-50">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center gap-4">
        {/* ブランドセクション */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg shrink-0">
            <StickyNoteIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
              Sticky Notes
            </h1>
            <p className="text-xs text-gray-500 hidden md:block">付箋メモアプリ</p>
          </div>
        </div>

        {/* 統計 & ボタン */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* 統計バッジ */}
          {noteCount > 0 && (
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/50">
              <span>{noteCount}枚</span>
              {pinnedCount > 0 && (
                <>
                  <span className="text-gray-300">|</span>
                  <Pin className="w-3 h-3" />
                  <span>{pinnedCount}/{MAX_PINNED_NOTES}</span>
                </>
              )}
            </div>
          )}

          {/* 付箋追加ボタン */}
          <button
            onClick={onAddNote}
            className="group flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-blue-400/20 text-sm"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            <span className="hidden sm:inline">付箋を追加</span>
            <span className="sm:hidden">追加</span>
          </button>
        </div>
      </div>
    </header>
  )
}
