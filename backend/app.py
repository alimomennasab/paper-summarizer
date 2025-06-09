import pymupdf
import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()
key = os.getenv("OPENAI_KEY")
app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "Flask is running"


@app.route("/summarize", methods=["POST"])
def summarize():
    print("Summarizing PDF")

    uploaded_file = request.files.get("file")
    if not uploaded_file:
        print("No file received in request")
        return jsonify({"error": "No file uploaded"}), 400

    summarized_text = ""
    doc = pymupdf.open(stream=uploaded_file.read(), filetype="pdf")

    for page_index in range(len(doc)): # iterate over pdf pages
        print("Processing page", page_index + 1, "of", len(doc))
        page = doc[page_index] # get the page
        summarized_text += page.get_text()
        print("")

    doc.close()

    total_tokens = len(summarized_text.split())
    print(f"Total tokens in text: {total_tokens}")
    client = openai.OpenAI(api_key=key)
    response = client.responses.create(
        model="gpt-4.1-nano",
        input=f"Summarize this research paper succinctly and clearly: {summarized_text}",
        max_output_tokens = total_tokens
    )

    print(response.output_text)
    return jsonify({"summary": response.output_text})
    

if __name__ == "__main__":
    app.run(debug=True, port=5001, host="0.0.0.0")