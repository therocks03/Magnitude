import csv
import json

data = []
with open('josaa_data.csv', 'r', encoding='utf-8', errors='ignore') as f:
    reader = csv.reader(f)
    for row in reader:
        if len(row) >= 6:
            institute = row[0].strip()
            branch = row[1].strip()
            category = row[2].strip()
            gender = row[3].strip()
            try:
                op_rank = int(row[4].strip())
                cl_rank = int(row[5].strip())
            except:
                continue # Skip header or invalid numeric
            data.append({
                "institute": institute,
                "branch": branch,
                "category": category,
                "gender": gender,
                "closing_rank": cl_rank
            })

with open('josaa_data.json', 'w', encoding='utf-8') as js:
    json.dump(data, js)

print(f"Processed {len(data)} records into josaa_data.json")
