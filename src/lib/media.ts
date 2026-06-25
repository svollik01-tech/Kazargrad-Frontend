/** Helpers for rendering gallery video items from a plain URL. */

export interface VideoInfo {
  /** How to render it. */
  kind: 'youtube' | 'file' | 'iframe'
  /** Embeddable URL (iframe src) or the direct file URL. */
  embedUrl: string
  /** Optional preview thumbnail URL (YouTube only). */
  thumbnail?: string
}

/** Extract a YouTube video id from the common URL shapes. */
function youTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([\w-]{11})/,
    /youtube\.com\/watch\?v=([\w-]{11})/,
    /youtube\.com\/embed\/([\w-]{11})/,
    /youtube\.com\/shorts\/([\w-]{11})/,
  ]
  for (const re of patterns) {
    const m = url.match(re)
    if (m) return m[1]
  }
  return null
}

/** Resolve a video URL into something we can embed/play. */
export function resolveVideo(url: string): VideoInfo {
  const yt = youTubeId(url)
  if (yt) {
    return {
      kind: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${yt}`,
      thumbnail: `https://img.youtube.com/vi/${yt}/hqdefault.jpg`,
    }
  }
  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)) {
    return { kind: 'file', embedUrl: url }
  }
  // Unknown provider — try to embed the URL directly in an iframe.
  return { kind: 'iframe', embedUrl: url }
}
