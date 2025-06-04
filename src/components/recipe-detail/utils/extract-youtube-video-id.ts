export function extractYouTubeVideoId(url: string): string | null {
  if (typeof url !== "string" || url.length === 0) {
    return null;
  }

  const youtubeVideoIdLength = 11;
  const youtubeUrlPatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/watch\?.*&v=)([^#&?]*).*/,
  ];

  for (const pattern of youtubeUrlPatterns) {
    const match = url.match(pattern);
    if (match && match[1]?.length === youtubeVideoIdLength) {
      return match[1];
    }
  }

  return null;
}
