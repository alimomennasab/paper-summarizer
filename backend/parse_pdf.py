import pymupdf
import openai
from flask import Flask
from dotenv import load_dotenv
import os

load_dotenv()
key = os.getenv("OPENAI_KEY")
#app = Flask(__name__)

# Function to parse PDF and extract text
#@app.route("/")
def parse_pdf(pdf_path):
    summarized_text = ""
    doc = pymupdf.open(pdf_path)

    for page_index in range(len(doc)): # iterate over pdf pages
        print("Processing page", page_index + 1, "of", len(doc))
        page = doc[page_index] # get the page
        summarized_text += page.get_text()
        print("")

    doc.close()
    return summarized_text


# Function to summarize the parsed text with OpenAI's API
#@app.route("/summarize")
def summarize(pdf_path):
    text = parse_pdf(pdf_path)
    total_tokens = len(text.split())
    print(f"Total tokens in text: {total_tokens}")
    client = openai.OpenAI(api_key=key)
    response = client.responses.create(
        model="gpt-4.1-nano",
        input=f"Summarize this research paper succinctly and clearly: {text}",
        max_output_tokens = total_tokens
    )

    print(response.output_text)
    

if __name__ == "__main__":
    pdf_path = "Attention Is All You Need.pdf"
    summarize(pdf_path)
    #app.run(debug=True)