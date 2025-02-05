// components/VConsole.tsx
'use client'

import { useEffect } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let vConsoleInstance: any = null

export default function VConsole() {
  useEffect(() => {
    const initVConsole = async () => {
      // フラグを有効に設定したときのみvConsoleを読み込む
      if (process.env.ENABLE_VCONSOLE === 'true') {
        try {
          // vConsoleを動的にインポート
          const VConsoleModule = await import('vconsole')
          // すでにインスタンスが存在する場合は作成しない
          if (!vConsoleInstance) {
            vConsoleInstance = new VConsoleModule.default()
          }
        } catch (error) {
          console.error('Failed to load vConsole:', error)
        }
      }
    }

    initVConsole()

    // クリーンアップ関数
    return () => {
      if (vConsoleInstance) {
        vConsoleInstance.destroy()
        vConsoleInstance = null
      }
    }
  }, [])

  // このコンポーネントは何もレンダリングしない
  return null
}
