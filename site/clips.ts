// Data only: which part of each Veo clip the chain uses (seconds of raw/vN.mp4, 24 fps, 8.0 s each).
// The files are already cleaned (stars painted out, audio removed): run film-frames with --delogo "".
// Example: npm run film-frames -- --src raw/v1.mp4 --name vaskaro-v1 --fps 24 --start 0 --end 4 --delogo ""
export const CLIPS = [
  { name: "v1", src: "raw/v1.mp4", from: "k1", to: "k2", start: 0, end: 4.5 },
  { name: "v2", src: "raw/v2.mp4", from: "k2", to: "k3", start: 0, end: 5.0 },
  { name: "v3", src: "raw/v3.mp4", from: "k3", to: "k4", start: 0, end: 8.0 },
  { name: "v4", src: "raw/v4.mp4", from: "k4", to: "k5", start: 0, end: 8.0 },
] as const;

// k4 and k5 have a 1 px bright line along the bottom edge: use the 2 px cropped copies.
export const STILLS_USED = { k4: "raw/k4-used.jpg", k5: "raw/k5-used.jpg" } as const;
