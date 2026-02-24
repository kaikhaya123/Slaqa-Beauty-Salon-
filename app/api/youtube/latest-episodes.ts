import { NextResponse } from 'next/server'

interface YouTubeVideo {
  id: string
  title: string
  youtubeId: string
}

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID

    if (!apiKey || !channelId) {
      return NextResponse.json(
        { error: 'YouTube API credentials not configured' },
        { status: 500 }
      )
    }

    // First, get the channel's uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
    )

    if (!channelResponse.ok) {
      throw new Error('Failed to fetch channel details')
    }

    const channelData = await channelResponse.json()
    const uploadsPlaylistId =
      channelData.items[0].contentDetails.relatedPlaylists.uploads

    // Then, get the latest videos from the uploads playlist
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=12&key=${apiKey}`
    )

    if (!videosResponse.ok) {
      throw new Error('Failed to fetch videos')
    }

    const videosData = await videosResponse.json()

    const episodes: YouTubeVideo[] = videosData.items.map(
      (item: any) => ({
        id: item.contentDetails.videoId,
        title: item.snippet.title,
        youtubeId: item.contentDetails.videoId,
      })
    )

    return NextResponse.json(episodes)
  } catch (error) {
    console.error('YouTube API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch episodes' },
      { status: 500 }
    )
  }
}
