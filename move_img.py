import shutil
import os

source = r"C:/Users/Ganyu Wangy/.gemini/antigravity/brain/d08ab7d7-8a3b-4a88-9ad4-e8a6a0393f5c/uploaded_media_1769566647452.jpg"
dest_dir = r"assets/images"
dest_file = os.path.join(dest_dir, "profile.jpg")

os.makedirs(dest_dir, exist_ok=True)
shutil.copy2(source, dest_file)
print(f"Copied to {dest_file}")
