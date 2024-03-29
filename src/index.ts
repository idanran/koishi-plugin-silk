import { Context, Schema, Service } from 'koishi'
import { silkEncode, silkDecode } from './worker'
import { isWav, getDuration, getWavFileInfo } from 'silk-wasm'

declare module 'koishi' {
  interface Context {
    silk: SILK
  }
}

class SILK extends Service {
  constructor(ctx: Context, config: SILK.Config) {
    super(ctx, 'silk')
  }

  /** `input` 为 wav 或单声道 pcm_s16le, `sampleRate` 为 `input` 的采样率 */
  encode(input: ArrayBufferView | ArrayBuffer, sampleRate: number) {
    return silkEncode(input, sampleRate)
  }

  /** `input` 为 silk, `sampleRate` 为 `input` 的采样率 */
  decode(input: ArrayBufferView | ArrayBuffer, sampleRate: number) {
    return silkDecode(input, sampleRate)
  }

  getDuration(silk: ArrayBufferView | ArrayBuffer, frameMs = 20) {
    return getDuration(silk, frameMs)
  }

  isWav(fileData: ArrayBufferView | ArrayBuffer) {
    return isWav(fileData)
  }

  getWavFileInfo(fileData: ArrayBufferView | ArrayBuffer) {
    return getWavFileInfo(fileData)
  }
}

namespace SILK {
  export interface Config { }
  export const Config: Schema<Config> = Schema.object({})
}

export default SILK