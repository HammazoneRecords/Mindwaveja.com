import cv2
import os

input_path = "public/media/grey-hero.mp4"
output_path = "public/media/grey-hero-temp.mp4"

# Open video
cap = cv2.VideoCapture(input_path)

# Get video properties
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = cap.get(cv2.CAP_PROP_FPS)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

print(f"Original video: {width}x{height} @ {fps} fps, {total_frames} frames")

# Define crop area (remove 250 pixels from right where logo typically is)
crop_width = width - 250
crop_height = height

# Setup video writer
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter(output_path, fourcc, fps, (crop_width, crop_height))

frame_count = 0
while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    # Crop the frame (remove right side)
    cropped_frame = frame[:, :crop_width]
    
    out.write(cropped_frame)
    frame_count += 1
    
    if frame_count % 30 == 0:
        print(f"Processed {frame_count}/{total_frames} frames")

cap.release()
out.release()

# Replace original with cropped version
os.replace(output_path, input_path)
print(f"Video cropped and saved to {input_path}")
