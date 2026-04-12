import { StickyNote as StickyNoteIcon, Plus, Move, Pin } from 'lucide-react'

// 付箋がない場合のウェルカム画面
interface EmptyStateProps {
  onAddNote: () => void
}

export function EmptyState({ onAddNote }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full relative z-10 pt-16">
      <div className="text-center max-w-2xl mx-auto px-6">
        {/* メインアイコン */}
        <div className="mb-8 relative inline-block">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-xl">
            <StickyNoteIcon className="w-16 h-16 text-blue-500" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse" />
        </div>

        {/* タイトル */}
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3">
          付箋メモを始めよう
        </h2>
        <p className="text-gray-500 text-lg mb-10">
          アイデアをキャンバスに自由に貼り付けて整理しましょう
        </p>

        {/* 機能紹介グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
          {[
            { icon: Move, title: 'ドラッグ&ドロップ', desc: '付箋を自由に配置' },
            { icon: Pin, title: 'ピン留め機能', desc: '重要なメモを最大3枚固定' },
            { icon: StickyNoteIcon, title: 'カラーテーマ', desc: '8種類の色から選択' },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm"
            >
              <div className="w-10 h-10 mx-auto mb-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">{title}</h3>
              <p className="text-gray-500 text-xs">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTAボタン */}
        <button
          onClick={onAddNote}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-blue-400/20"
        >
          <Plus className="w-5 h-5" />
          最初の付箋を追加
        </button>
      </div>
    </div>
  )
}
