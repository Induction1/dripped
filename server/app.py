from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from openai import OpenAI
import numpy as np
import pandas as pd
import math
from dotenv import load_dotenv
import os
load_dotenv()

df = pd.read_csv("World_Countries_Centroids.csv")
country_dict = {}
for index, row in df.iterrows():
    country_dict[row["COUNTRY"].lower()] = (row["longitude"], row["latitude"])

df_2 = pd.read_csv("weights.csv")
weights = np.array(df_2[["transportDistance", "cotton", "organicCotton", "polyester", "lyocell", "elastane", "polyamide", "elastomultiester", "recycled"]].values)
bias = np.array(df_2["bias"].values).reshape(4, 1)

def distance(p1, p2):
    lon1, lat1 = p1
    lon2, lat2 = p2
    lon1 = math.radians(lon1)
    lon2 = math.radians(lon2)
    lat1 = math.radians(lat1)
    lat2 = math.radians(lat2)
    delta_lon = lon2 - lon1 
    delta_lat = lat2 - lat1
    a = math.sin(delta_lat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(delta_lon / 2)**2
    c = 2 * math.asin(math.sqrt(a)) 
    r = 3956 # Radius of Earth in miles
    return c * r

client = OpenAI(api_key=os.getenv("API_KEY"))

# Create Flask app
app = Flask(__name__)
cors = CORS(app, supports_credentials = True)

@app.route("/")
def hello():
    return "Hello!"

@app.route("/request_eval", methods = ["POST"])
@cross_origin(supports_credentials = True)
def request_eval():
    try:
        print(request.json)
        if "page_data" in request.json:
            page_data = request.json["page_data"]
            # Send page_data to OpenAI API
            prompt = "Take this scraped input for a clothing item and list the following in the following format. For fields that you do not find, write N/A.\nFormat:\nMaterial: [X]% [Cotton or Organic Cotton or Polyester or Lyocell or Elastane or Polyamide or Elastomultiester], [X]% [Cotton or Organic Cotton or Polyester or Lyocell or Elastane or Polyamide or Elastomultiester or Other]…\nRecycled Material: [X]%\nCountry of Origin: [United States or Laos or Vietnam…]\nCompany: [SHEIN or Amazon or GAP…]\nClothing Item: [string]"

            response = client.chat.completions.create(
                model = "gpt-3.5-turbo",
                messages = [
                    {"role": "system", "content": "You are helping me extract information from webscraped html content."},
                    {"role": "user", "content": prompt + page_data},
                ]
            )
            print(response)

            output = response.choices[0].message.content
            print(output)

            data = {
                "material": {},
                "material_string": "N/A",
                "transportationDistance": 8000,
                "company": "N/A",
                "recycled": 0,
                "recycled_string:": "N/A",
                "country": "N/A",
                "clothing": "N/A"
            }
            print(data)
            valid_materials = ["Cotton", "Organic Cotton", "Polyester", "Lyocell", "Elastane", "Polyamide", "Elastomultiester"]
            for line in output.splitlines():
                print("my", line)
                
                if "Material: " in line and not "Recycled Material: " in line:
                    materials = line[line.index("Material: ") + len("Material: "):].rstrip()
                    data["material_string"] = materials
                    materials = list(map(lambda x: [x[:x.index(" ")], x[x.index(" ") + 1:]], materials.split(", ")))
                    materials = list(map(lambda x: (int(x[0][:-1]) / 100, x[1]), materials))
                    mat_sum = 0
                    for k, v in materials:
                        data["material"][v] = k
                        if v in valid_materials:
                            mat_sum += k
                    if mat_sum < 1:
                        if not "Cotton" in data["material"]:
                            data["material"]["Cotton"] = 0
                        data["material"]["Cotton"] += 1 - mat_sum
                    print(data)
                
                if "Country of Origin: " in line:
                    data["country"] = line[line.index("Country of Origin: ") + len("Country of Origin: "):].rstrip()

                if "Company: " in line:
                    data["company"] = line[line.index("Company: ") + len("Company: "):].rstrip()

                if "Clothing Item: " in line:
                    data["clothing"] = line[line.index("Clothing Item: ") + len("Clothing Item: "):].rstrip()

                if "Recycled Material: " in line:
                    recycled_string = line[line.index("Recycled Material: ") + len("Recycled Material: "):].rstrip()
                    data["recycled_string"] = recycled_string
                    if not "N/A" in recycled_string and "%" in recycled_string:
                        data["recycled"] = int(recycled_string[:recycled_string.index("%")]) / 100

            # Create input embedding
            input_embedding = np.array([
                data["transportationDistance"],
                data["material"].get("Cotton", 0),
                data["material"].get("Organic Cotton", 0),
                data["material"].get("Polyester", 0),
                data["material"].get("Lyocell", 0),
                data["material"].get("Elastane", 0),
                data["material"].get("Polyamide", 0),
                data["material"].get("Elastomultiester", 0),
                data["recycled"]
            ]).reshape(9, 1)
            output = np.matmul(weights, input_embedding) + bias
            output = output.tolist()
            print(input_embedding)
            print(output)
            print("about to jsonify")
            print("is?", data["country"].lower(), data["country"].lower() in country_dict)
            response = make_response(
                jsonify({
                    "output": output,
                    "company": data["company"],
                    "country": data["country"],
                    "transportationDistance": f'{round(distance(country_dict[data["country"].lower()], country_dict["united states"]))} miles' if data["country"].lower() in country_dict else "N/A",
                    "clothing": data["clothing"],
                    "material_string": data["material_string"],
                    "recycled_string": data["recycled_string"]
                }),
                200,
            )
            print(response)
            response.headers["Content-Type"] = "application/json"
            return response
    except:
        print("error")
        return jsonify({
            "output": "error"
        }), 200
            

if __name__ == "__main__":  
   app.run(port = 8000, debug = True)