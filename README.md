# Javed Travel — Your Trusted Journey Partner

AI-powered travel agency website with **Zara**, an intelligent chat assistant that helps visitors explore packages, book flights, and get instant answers.

## Live Site

Deployed on Vercel: [javed-travel.vercel.app](https://javed-travel.vercel.app)

## Features

- Animated preloader with plane icon
- Welcome hook overlay (auto-dismisses after 8 seconds)
- AI chat assistant **Zara** powered by Groq + Llama 4
- Travel packages: Umrah & Hajj, Europe Tour, Malaysia Holiday
- Flight booking, hotel reservations, and visa assistance sections
- Fully responsive design for mobile and desktop

## Tech Stack

- **Frontend** — HTML, CSS, JavaScript
- **AI Backend** — Python Flask + Groq API (Llama 4)
- **Fonts** — Playfair Display + Poppins (Google Fonts)
- **Hosting** — Vercel (frontend) / Local or Render (AI backend)

## Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/midhatnayab7-creator/JavedTravel.git
cd JavedTravel

# 2. Install Python dependencies
pip install -r requirements.txt

# 3. Set your Groq API key
export GROQ_API_KEY="your-key-here"

# 4. Start the AI backend (port 5000)
python ai_server.py

# 5. Open index.html in your browser
```

## Project Structure

```
javed-travel/
├── index.html          # Main website
├── ai_server.py        # Zara AI backend (Flask + Groq)
├── requirements.txt    # Python dependencies
├── vercel.json         # Vercel deployment config
├── css/
│   └── style.css       # Stylesheet
├── js/
│   └── main.js         # Frontend JavaScript
└── api/
    ├── chat.py         # Vercel serverless function for Zara
    └── requirements.txt
```

## Author

**Javed Travel** — Trusted since 2005, based in Karachi, Pakistan
