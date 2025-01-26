import os
import json

# Open the json file
with open('sign_to_prediction_index_map.json', 'r') as file:
    folder_names = list(json.load(file).keys())

# Create the folders
for folder_name in folder_names:
    os.makedirs(f"C:\\Users\\antho\\Documents\\tamuhack25\\words\\{folder_name}", exist_ok=True)

# Get the file locations
with open("train.csv", "r") as file:
    next(file)
    for line in file:
        info = line.strip().split(",")
        source_path = info[0]
        destination_path = f"C:\\Users\\antho\\Documents\\tamuhack25\\words\\{info[-1]}\\{info[2]}.parquet"

        os.rename(source_path, destination_path)
