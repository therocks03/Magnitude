import urllib.request
import json
import ssl
import sys

ssl._create_default_https_context = ssl._create_unverified_context

repos = ['Sbrjt/josaa-cutoffs', 'dvishal485/jossa-cutoff-2021', 'shadab375/josaa-cutoffs', 'Quantum-Codes/JoSAA_2024']

def find_csv(repo):
    for branch in ['main', 'master']:
        url = f"https://api.github.com/repos/{repo}/git/trees/{branch}?recursive=1"
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response:
                tree = json.loads(response.read().decode('utf-8')).get('tree', [])
                for file in tree:
                    # Look for likely cutoff datasets
                    path = file['path'].lower()
                    if path.endswith('.csv') and 'round' in path:
                        return f"https://raw.githubusercontent.com/{repo}/{branch}/{file['path']}"
                # Fallback if no round specific csv
                for file in tree:
                    path = file['path'].lower()
                    if path.endswith('.csv'):
                        return f"https://raw.githubusercontent.com/{repo}/{branch}/{file['path']}"
        except Exception:
            continue
    return None

success = False
for r in repos:
    csv_url = find_csv(r)
    if csv_url:
        print(f"Downloading from {csv_url}")
        req = urllib.request.Request(csv_url, headers={'User-Agent': 'Mozilla/5.0'})
        import sys
        try:
            data = urllib.request.urlopen(req).read()
            with open("josaa_data.csv", "wb") as f:
                f.write(data)
            print("Downloaded successfully,", len(data), "bytes")
            success = True
            break
        except Exception as e:
            print("Failed to download", e)

if not success:
    print("Could not find any CSV dataset!")
