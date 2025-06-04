import { extractYouTubeVideoId } from "./extract-youtube-video-id";

describe("extractYouTubeVideoId", () => {
  it("should extract video ID from standard YouTube watch URL", () => {
    const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    const videoId = extractYouTubeVideoId(url);

    expect(videoId).toBe("dQw4w9WgXcQ");
  });

  it("should extract video ID from youtu.be short URL", () => {
    const url = "https://youtu.be/dQw4w9WgXcQ";
    const videoId = extractYouTubeVideoId(url);

    expect(videoId).toBe("dQw4w9WgXcQ");
  });

  it("should extract video ID from YouTube embed URL", () => {
    const url = "https://www.youtube.com/embed/dQw4w9WgXcQ";
    const videoId = extractYouTubeVideoId(url);

    expect(videoId).toBe("dQw4w9WgXcQ");
  });

  it("should extract video ID from YouTube URL with additional parameters", () => {
    const url =
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=123s&feature=share";
    const videoId = extractYouTubeVideoId(url);

    expect(videoId).toBe("dQw4w9WgXcQ");
  });

  it("should return null for invalid YouTube URL", () => {
    const url = "https://www.youtube.com/invalid";
    const videoId = extractYouTubeVideoId(url);

    expect(videoId).toBeNull();
  });

  it("should return null for non-YouTube URL", () => {
    const url = "https://www.example.com/video";
    const videoId = extractYouTubeVideoId(url);

    expect(videoId).toBeNull();
  });

  it("should return null for empty string", () => {
    const videoId = extractYouTubeVideoId("");

    expect(videoId).toBeNull();
  });

  it("should return null for non-string input", () => {
    const videoId = extractYouTubeVideoId(123 as unknown as string);

    expect(videoId).toBeNull();
  });

  it("should return null for URL with invalid video ID length", () => {
    const url = "https://www.youtube.com/watch?v=short";
    const videoId = extractYouTubeVideoId(url);

    expect(videoId).toBeNull();
  });
});
