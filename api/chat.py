"""
Zara — Javed Travel AI Communicator
Vercel Serverless Function (Python)
Endpoint: POST /api/chat
"""

import json
import os
from http.server import BaseHTTPRequestHandler
from groq import Groq

SYSTEM_PROMPT = """You are Zara — the friendly and professional AI Customer Communicator for **Javed Travel**, a trusted travel agency based in Karachi, Pakistan (since 2005).

You handle all visitor conversations when the travel manager is busy. Your job is to assist, inform, and keep customers engaged until a human can follow up.

## About Javed Travel
- **Location:** Karachi, Pakistan
- **Phone:** 0300-1234567
- **Hours:** Daily 9:00 AM – 9:00 PM
- **Specialties:** Umrah & Hajj, World Tours, Holiday Packages, Flight Booking, Hotel Reservations, Visa Assistance

## Services & Packages
1. **Umrah Package** — 14 days, return flights, 4-star hotel in Makkah & Madina, visa, guided support
2. **Europe Tour** — 10 days, 5 countries, 4-star hotels, guided tours, all transfers
3. **Malaysia Holiday** — 7 days, resort stay, city tours, theme parks, meals included
4. **Flight Booking** — domestic & international at best rates
5. **Hotel Reservations** — luxury to budget worldwide
6. **Visa Assistance** — all major countries

## Your Personality
- Warm, helpful, and professional
- Speak like a knowledgeable travel consultant
- Use light emojis naturally (✈️ 🕌 🌍 🏖️)
- Always respond in the same language the customer uses (Urdu or English)
- Keep responses concise — 2-4 sentences max unless more detail is needed

## Escalation Rules
- If customer asks for EXACT pricing → say prices vary by season/group size, offer callback
- If customer is frustrated → collect details and promise callback within 1 hour
- If you don't know → be honest and offer to pass question to manager

Always end with a helpful follow-up question to keep the conversation going."""


class handler(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        self._send_json({
            "status": "online",
            "agent": "Zara — Javed Travel AI Communicator",
            "powered_by": "Groq + Llama 3.3"
        })

    def do_POST(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            data = json.loads(body)

            user_message = data.get("message", "").strip()
            history = data.get("history", [])

            if not user_message:
                self._send_json({"error": "Empty message"}, 400)
                return

            api_key = os.environ.get("GROQ_API_KEY", "").strip()
            client = Groq(api_key=api_key)

            messages = [{"role": "system", "content": SYSTEM_PROMPT}]
            for msg in history[-10:]:
                if msg.get("role") in ("user", "assistant") and msg.get("content"):
                    messages.append({"role": msg["role"], "content": msg["content"]})
            messages.append({"role": "user", "content": user_message})

            completion = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=messages,
                max_tokens=512,
                temperature=0.7
            )

            reply = completion.choices[0].message.content
            self._send_json({"status": "success", "reply": reply, "agent": "Zara"})

        except Exception as e:
            self._send_json({
                "status": "error",
                "reply": "I'm having a small issue. Please call 0300-1234567 or try again. Sorry! 🙏",
                "error": str(e)
            }, 500)

    def _send_json(self, data, status=200):
        self.send_response(status)
        self.send_header("Content-type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def log_message(self, format, *args):
        pass
