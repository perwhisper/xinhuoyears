import os
from PIL import Image
import sys

def compress_images(directory='public/image', quality=70):
    """
    Compresses all PNG and JPG images in the specified directory.
    
    Args:
        directory (str): Path to the directory containing images.
        quality (int): Compression quality (1-100). Lower is smaller file size.
    """
    if not os.path.exists(directory):
        print(f"Directory not found: {directory}")
        return

    print(f"Scanning directory: {directory}...")
    
    total_saved = 0
    
    for root, _, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                file_path = os.path.join(root, file)
                try:
                    # Get original size
                    original_size = os.path.getsize(file_path)
                    
                    with Image.open(file_path) as img:
                        # Convert RGBA to RGB if necessary (for JPEG saving)
                        if img.mode in ('RGBA', 'P') and file.lower().endswith(('jpg', 'jpeg')):
                            img = img.convert('RGB')
                        
                        # Save with optimization
                        # For PNG, we use optimize=True
                        # For JPG, we use quality=quality
                        if file.lower().endswith('.png'):
                            img.save(file_path, optimize=True, quality=quality)
                        else:
                            img.save(file_path, optimize=True, quality=quality)
                            
                    new_size = os.path.getsize(file_path)
                    saved = original_size - new_size
                    total_saved += saved
                    
                    if saved > 0:
                        print(f"Compressed {file}: {original_size/1024:.2f}KB -> {new_size/1024:.2f}KB (Saved {saved/1024:.2f}KB)")
                    else:
                        print(f"Skipped {file} (No size reduction)")
                        
                except Exception as e:
                    print(f"Error compressing {file}: {e}")

    print(f"\nTotal space saved: {total_saved/1024/1024:.2f} MB")
    print("Compression complete!")

if __name__ == "__main__":
    target_dir = sys.argv[1] if len(sys.argv) > 1 else "public/image"
    compress_images(target_dir)
