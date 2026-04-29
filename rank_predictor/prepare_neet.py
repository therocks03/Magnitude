import csv
import json
import re

def clean_inst(name):
    # remove addresses after comma or similar
    name = name.split(',')[0].strip()
    return name

cutoffs = {} # (institute, branch, category, gender) -> max_rank

with open('neet_data.csv', 'r', encoding='utf-8', errors='ignore') as f:
    reader = csv.reader(f)
    for i, row in enumerate(reader):
        if i < 3: # skip headers
            continue
        if len(row) < 17:
            continue
            
        try:
            rank = int(row[0].strip())
        except:
            continue
            
        r1_inst = row[2].strip()
        r1_course = row[3].strip()
        r1_quota = row[1].strip()
        
        r2_inst = row[6].strip()
        r2_course = row[7].strip()
        
        r3_inst = row[11].strip()
        r3_course = row[12].strip()
        r3_allot_cat = row[13].strip()
        
        final_inst = ""
        final_course = ""
        final_category = "OPEN" # Default
        gender = "Gender-Neutral" # Default
        
        if r3_inst and r3_inst != "-":
            final_inst = r3_inst
            final_course = r3_course
            if r3_allot_cat and r3_allot_cat != "-":
                final_category = r3_allot_cat
        elif r2_inst and r2_inst != "-":
            final_inst = r2_inst
            final_course = r2_course
        elif r1_inst and r1_inst != "-":
            final_inst = r1_inst
            final_course = r1_course
            
        if final_inst and final_inst != "-":
            # Heuristics for categories
            # Common conversions for NEET UI: OPEN, OBC-NCL, EWS, SC, ST
            cat_upper = final_category.upper()
            if "OBC" in cat_upper or "BC" in cat_upper:
                gui_cat = "OBC-NCL"
            elif "EWS" in cat_upper:
                gui_cat = "EWS"
            elif "SC" in cat_upper:
                gui_cat = "SC"
            elif "ST" in cat_upper:
                gui_cat = "ST"
            else:
                gui_cat = "OPEN"
                
            if "Female" in r1_quota or "Female" in row[16] or "Female" in row[9]:
                gender = "Female-Only"
                
            inst_clean = clean_inst(final_inst)
            
            key = (inst_clean, final_course, gui_cat, gender)
            if key not in cutoffs:
                cutoffs[key] = rank
            else:
                # Update max rank
                if rank > cutoffs[key]:
                    cutoffs[key] = rank

data_list = []
for (inst, course, cat, gen), max_r in cutoffs.items():
    data_list.append({
        "institute": inst,
        "branch": course,
        "category": cat,
        "gender": gen,
        "closing_rank": max_r
    })

# output to JS
with open('neet_data.js', 'w', encoding='utf-8') as f:
    f.write("const NEET_DATA = ")
    json.dump(data_list, f, indent=4)
    f.write(";")

print(f"Processed {len(data_list)} unique college+category cutoffs into neet_data.js.")
