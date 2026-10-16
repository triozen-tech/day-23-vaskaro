"""Paint the engine-cover badge out of a clip. Positions: raw/_orig/emblem-pos.json (index = frame across v2 (first 120), v3, v4), in 1600x900 frame space.
usage: python3 scripts/paint_emblem.py <clip v2|v3|v4>   (reads raw/_orig/clips/<clip>.mp4, writes raw/<clip>.mp4)"""
import cv2, json, numpy as np, subprocess, sys, os, shutil, tempfile
v = sys.argv[1]; off = {"v2": 0, "v3": 120, "v4": 312}[v]; n_use = {"v2": 120, "v3": 192, "v4": 192}[v]
pos = json.load(open("raw/_orig/emblem-pos.json")); S = 1920 / 1600
cap = cv2.VideoCapture(f"raw/_orig/clips/{v}.mp4"); tmp = tempfile.mkdtemp(); i = 0
while True:
    ok, im = cap.read()
    if not ok: break
    if i < n_use:
        x, y = pos[str(off + i)]
        m = np.zeros(im.shape[:2], np.uint8); cv2.ellipse(m, (round(x * S), round(y * S)), (22, 25), 0, 0, 360, 255, -1)
        out = cv2.inpaint(im, m, 7, cv2.INPAINT_TELEA)
        soft = cv2.GaussianBlur(m, (19, 19), 0)[..., None] / 255.
        im = (out * soft + im * (1 - soft)).astype(np.uint8)
    cv2.imwrite(f"{tmp}/{i:05d}.png", im); i += 1
subprocess.run(["ffmpeg", "-y", "-v", "error", "-framerate", "24", "-i", f"{tmp}/%05d.png", "-c:v", "libx264", "-crf", "15", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", f"raw/{v}.mp4"], check=True)
shutil.rmtree(tmp); print(v, i, "frames")
