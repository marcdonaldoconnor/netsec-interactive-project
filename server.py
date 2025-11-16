#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 5000

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

os.chdir(os.path.dirname(os.path.abspath(__file__)))

Handler = NoCacheHTTPRequestHandler

with ReusableTCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print(f"CyberLearn server running at http://0.0.0.0:{PORT}")
    print("Press Ctrl+C to stop the server")
    httpd.serve_forever()
