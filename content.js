let videoElements = [];
let isVideoPaused = false;

function getVideos() {
  // Select video elements for YouTube, Vimeo, Dailymotion, and Udemy
  videoElements = Array.from(document.querySelectorAll("video, .vjs-tech, .shaka-video-container video"));
}

function pauseVideos() {
  videoElements.forEach(video => {
    video.pause();
    isVideoPaused = true;
  });
}

function resumeVideos() {
  videoElements.forEach(video => {
    video.play().catch(err => console.error('Playback failed:', err));
    isVideoPaused = false;
  });
}

const api = typeof browser !== 'undefined' ? browser : chrome;

api.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "resumeVideo" && isVideoPaused) {
    resumeVideos();
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    pauseVideos();
  } else if (document.visibilityState === "visible") {
    resumeVideos();
  }
});

// Initialize video elements on page load
window.addEventListener('load', getVideos);
