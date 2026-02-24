# YouTube API Integration Setup

## Overview
The TheBarbershow component now dynamically fetches the latest episodes from your YouTube channel using the YouTube Data API v3.

## Setup Steps

### 1. Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Search for "YouTube Data API v3" and enable it
4. Go to "Credentials" in the left menu
5. Click "Create Credentials" → "API Key"
6. Copy your API key

### 2. Get Your Channel ID

1. Visit your YouTube channel: https://www.youtube.com/@slaqasalon
2. Click on your profile icon → "Channel"
3. Go to "About" tab
4. Your channel ID is listed (format: UC...)
   - **Alternative**: Visit https://www.youtube.com/@slaqasalon/about and look for the channel ID

### 3. Add to Environment Variables

1. Open or create `.env.local` in your project root:
   ```bash
   NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key_here
   NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxxxx
   ```

2. Replace `your_api_key_here` with your actual API key
3. Replace the channel ID with your actual channel ID

### 4. Restart Development Server

```bash
npm run dev
```

## How It Works

- **Endpoint**: `/api/youtube/latest-episodes`
- **Fetches**: Latest 4 videos from your channel's uploads
- **Fallback**: If API fails, uses hardcoded episodes
- **Caching**: Fetches on component mount

## Troubleshooting

### "YouTube API credentials not configured"
- Check that both env variables are set in `.env.local`
- Restart the development server after adding env variables

### "Failed to fetch channel details"
- Verify channel ID is correct (should start with "UC")
- Ensure YouTube Data API is enabled in Google Cloud

### "Failed to fetch videos"
- Check that API key has access to YouTube Data API v3
- Verify API key quotas haven't been exceeded

## API Response Format

Each episode includes:
```typescript
{
  id: "video_id",
  title: "Episode Title",
  youtubeId: "video_id"
}
```

## Notes

- The API fetches the 4 most recent videos from your channel
- Updates happen when the page loads
- Falls back to hardcoded episodes if API is unavailable
- API keys are public (NEXT_PUBLIC_*) - this is safe for read-only access
