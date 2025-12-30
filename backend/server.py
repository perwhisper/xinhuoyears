import http.server
import socketserver
import json
import os
from urllib.parse import urlparse, parse_qs

PORT = 3001
DB_FILE = 'wishes.json'

class WishHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        if parsed_path.path == '/api/wishes':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            wishes = []
            if os.path.exists(DB_FILE):
                with open(DB_FILE, 'r', encoding='utf-8') as f:
                    try:
                        wishes = json.load(f)
                    except:
                        wishes = []
            
            self.wfile.write(json.dumps(wishes).encode('utf-8'))
        else:
            super().do_GET()

    def do_POST(self):
        parsed_path = urlparse(self.path)
        if parsed_path.path == '/api/wishes':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8'))
                new_wish = data.get('content')
                
                if new_wish:
                    wishes = []
                    if os.path.exists(DB_FILE):
                        with open(DB_FILE, 'r', encoding='utf-8') as f:
                            try:
                                wishes = json.load(f)
                            except:
                                wishes = []
                    
                    # Add new wish to top
                    wishes.insert(0, new_wish)
                    
                    with open(DB_FILE, 'w', encoding='utf-8') as f:
                        json.dump(wishes, f, ensure_ascii=False)
                    
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({"status": "success"}).encode('utf-8'))
                else:
                    self.send_response(400)
                    self.end_headers()
            except Exception as e:
                print(e)
                self.send_response(500)
                self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

print(f"Server running on port {PORT}")
with socketserver.TCPServer(("", PORT), WishHandler) as httpd:
    httpd.serve_forever()
