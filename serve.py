import http.server, os
os.chdir("/Users/brendahelen/Documents/Frota 162/pasta sem título/notificacoes")
handler = http.server.SimpleHTTPRequestHandler
with http.server.HTTPServer(("", 7162), handler) as s:
    s.serve_forever()
