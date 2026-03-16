import { NextResponse } from 'next/server'

interface YouTubeVideo {
  id: string
  title: string
  youtubeId: string
  thumbnail: string
  publishedAt: string
  description: string
}

export async function GET() {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY ?? process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    const channelId = process.env.YOUTUBE_CHANNEL_ID ?? process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID

    if (!apiKey || !channelId) {
      return NextResponse.json(
        { error: 'YouTube API credentials not configured' },
        { status: 500 }
      )
    }

    // Get the channel's uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    )

    if (!channelResponse.ok) {
      throw new Error('Failed to fetch channel details')
    }

    const channelData = await channelResponse.json()

    if (!channelData.items?.length) {
      throw new Error('Channel not found')
    }

    const uploadsPlaylistId =
      channelData.items[0].contentDetails.relatedPlaylists.uploads

    // Get the latest videos from the uploads playlist
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=12&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    )

    if (!videosResponse.ok) {
      throw new Error('Failed to fetch videos')
    }

    const videosData = await videosResponse.json()

    const episodes: YouTubeVideo[] = videosData.items.map((item: {
      contentDetails: { videoId: string }
      snippet: {
        title: string
        publishedAt?: string
        description?: string
        thumbnails?: {
          maxres?: { url: string }
          high?: { url: string }
          medium?: { url: string }
        }
      }
    }) => ({
      id: item.contentDetails.videoId,
      title: item.snippet.title,
      youtubeId: item.contentDetails.videoId,
      thumbnail:
        item.snippet.thumbnails?.maxres?.url ??
        item.snippet.thumbnails?.high?.url ??
        item.snippet.thumbnails?.medium?.url ??
        `https://img.youtube.com/vi/${item.contentDetails.videoId}/hqdefault.jpg`,
      publishedAt: item.snippet.publishedAt ?? '',
      description: item.snippet.description ?? '',
    }))

    return NextResponse.json(episodes)
  } catch (error) {
    console.error('YouTube API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch episodes' },
      { status: 500 }
    )
  }
}
