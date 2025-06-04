import { RECIPE_DETAIL_PAGE_VIDEO_TITLE } from "@/consts/text.const";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RecipeDetailVideo from "./recipe-detail-video";
import { extractYouTubeVideoId } from "./utils/extract-youtube-video-id";

const mockVideoId = "dQw4w9WgXcQ";

vi.mock("./utils/extract-youtube-video-id", () => ({
  extractYouTubeVideoId: vi.fn(),
}));

describe(RecipeDetailVideo.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the video title", () => {
    vi.mocked(extractYouTubeVideoId).mockReturnValue(mockVideoId);
    const youtubeUrl = `https://youtube.com/watch?v=${mockVideoId}`;

    render(<RecipeDetailVideo youtubeId={youtubeUrl} />);

    expect(
      screen.getByText(RECIPE_DETAIL_PAGE_VIDEO_TITLE)
    ).toBeInTheDocument();
  });

  it("renders the YouTube iframe with correct video ID", () => {
    vi.mocked(extractYouTubeVideoId).mockReturnValue(mockVideoId);
    const youtubeUrl = `https://youtube.com/watch?v=${mockVideoId}`;

    render(<RecipeDetailVideo youtubeId={youtubeUrl} />);

    const iframe = screen.getByTitle("YouTube video player");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      `https://www.youtube.com/embed/${mockVideoId}`
    );
  });
});
