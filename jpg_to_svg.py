import base64
import os
import struct

def get_image_info(data):
    """
    Analyzes JPEG data to find width and height.
    """
    size = len(data)
    height = 0
    width = 0
    content_type = ''

    # handle JPEGs
    if (size >= 2) and data.startswith(b'\xff\xd8'):
        content_type = 'image/jpeg'
        try:
            index = 0
            size = 2
            ftype = 0
            while not 0xc0 <= ftype <= 0xcf or ftype in (0xc4, 0xc8, 0xcc):
                index += size
                ftype = data[index + 1]
                length = data[index + 2] * 256 + data[index + 3]
                size = length + 2
            height = data[index + 5] * 256 + data[index + 6]
            width = data[index + 7] * 256 + data[index + 8]
        except Exception:
            pass
    
    return width, height

def convert_to_svg(jpg_path):
    if not os.path.exists(jpg_path):
        print(f"Error: File not found: {jpg_path}")
        return

    print(f"Processing: {jpg_path}")
    
    with open(jpg_path, "rb") as image_file:
        data = image_file.read()
        encoded_string = base64.b64encode(data).decode('utf-8')
        
    width, height = get_image_info(data)
    
    # Fallback if detection fails
    if width == 0 or height == 0:
        print("Warning: Could not detect dimensions, using default 500x500")
        width, height = 500, 500
    else:
        print(f"Detected dimensions: {width}x{height}")
    
    # Create SVG content
    svg_content = f'''<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
\t viewBox="0 0 {width} {height}" style="enable-background:new 0 0 {width} {height};" xml:space="preserve">
<image style="overflow:visible;" width="{width}" height="{height}" xlink:href="data:image/jpeg;base64,{encoded_string}" />
</svg>'''

    # Output path
    svg_path = os.path.splitext(jpg_path)[0] + ".svg"
    
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    
    print(f"Success! SVG saved to: {svg_path}")

if __name__ == "__main__":
    target_file = r"G:\薪火年度报告\xinhuo11\public\454121742827fc273ed95fcd149e0572.jpg"
    convert_to_svg(target_file)
