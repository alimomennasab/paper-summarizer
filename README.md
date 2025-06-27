# Paper Summarizer
This project allows users to upload a PDF file of any research paper and receive a clear, brief summary. 

# Tech Stack
Frontend:
  - React: creating UI components
  - Next.js: routing 

Backend & Middleware:
- Flask: handling file uploads and requests to the OpenAI API
- OpenAI API: summarizing papers with GPT-4o

# Demo
https://github.com/user-attachments/assets/3cd88f39-6eb4-4321-9a54-64ee31fe93ee

# How to run locally: 
```bash
1. Clone the repository
git clone https://github.com/yourusername/paper-summarizer.git
cd paper-summarizer


2. Install backend dependencies
cd backend
pip install -r requirements.txt

3. Install frontend dependencies
cd frontend
npm install

4. Start the frontend and backend servers in separate terminals:
npm run dev 
python app.py
