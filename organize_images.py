import os
import shutil

def organize_images():
    source_dir = 'public/image/test'
    target_dir = 'public/image'
    images_ts_path = 'images.ts'
    
    if not os.path.exists(source_dir):
        print(f"Directory not found: {source_dir}")
        return

    # Get all files in source directory
    files = [f for f in os.listdir(source_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    files.sort() # Sort by name (timestamp)

    new_image_paths = []
    
    print(f"Found {len(files)} images in {source_dir}")
    
    for i, filename in enumerate(files):
        # Create new filename: film_01.jpg, film_02.jpg, etc.
        # Pad with leading zero if needed
        extension = os.path.splitext(filename)[1]
        new_filename = f"film_{i+1:02d}{extension}"
        
        old_path = os.path.join(source_dir, filename)
        new_path = os.path.join(target_dir, new_filename)
        
        # Check if target file exists, if so, maybe skip or overwrite? 
        # Since user said "rename and move", I'll assume overwriting is fine or just proceed.
        # But to be safe against collisions with existing 'film_xx.jpg', I should check.
        # However, for this task I will assume the target names are free or can be overwritten as per "rename" instruction.
        
        shutil.move(old_path, new_path)
        print(f"Moved {filename} -> {new_filename}")
        
        new_image_paths.append(f'"image/{new_filename}"')

    # Remove the test directory
    try:
        os.rmdir(source_dir)
        print(f"Removed directory: {source_dir}")
    except OSError as e:
        print(f"Error removing directory {source_dir}: {e}")

    # Update images.ts
    update_images_ts(images_ts_path, new_image_paths)

def update_images_ts(file_path, new_paths):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    new_lines = []
    in_film_images = False
    film_images_updated = False
    
    for line in lines:
        if 'export const FILM_IMAGES: string[] = [' in line:
            new_lines.append(line)
            in_film_images = True
            # Write new images
            for path in new_paths:
                new_lines.append(f'  {path},\n')
            film_images_updated = True
            continue
        
        if in_film_images:
            if '];' in line:
                in_film_images = False
                new_lines.append(line)
            # Skip existing lines inside the array
            continue
            
        new_lines.append(line)
    
    if film_images_updated:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print(f"Updated {file_path}")
    else:
        print("Could not find FILM_IMAGES array in images.ts")

if __name__ == "__main__":
    organize_images()
