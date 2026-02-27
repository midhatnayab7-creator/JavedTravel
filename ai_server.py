"""
=========================================
  JAVED TRAVEL — AI Communicator Agent
  Powered by Groq + Llama 4
=========================================
Run: python ai_server.py
URL: http://localhost:5000
"""

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq

app = Flask(__name__)
CORS(app)  # Allow requests from the website

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

# ─────────────────────────────────────────
#  JAVED TRAVEL AI SYSTEM PROMPT
# ─────────────────────────────────────────
SYSTEM_PROMPT = """You are Zara — the friendly and professional AI Customer Communicator for **Javed Travel**, a trusted travel agency based in Karachi, Pakistan (since 2005).

You handle all visitor conversations when the travel manager is busy. Your job is to assist, inform, and keep customers engaged until a human can follow up.

---

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

---

## Your Personality
- Warm, helpful, and professional
- Speak like a knowledgeable travel consultant
- Use light emojis naturally (✈️ 🕌 🌍 🏖️) — not excessively
- Always respond in the same language the customer uses (Urdu or English)
- Keep responses concise — 2-4 sentences max unless more detail is needed

## What You Can Do
- Answer questions about services, packages, pricing (general), destinations
- Help customers decide which package suits them
- Collect their name and phone number to arrange a callback
- Take a message to pass to the manager
- Explain visa requirements, travel documents
- Suggest best travel seasons for destinations

## Escalation Rules
- If customer asks for EXACT pricing → say prices vary by season/group size, offer to arrange a callback
- If customer is frustrated or insists on speaking to a human → collect their details and promise a callback within 1 hour
- If customer asks something you don't know → be honest and offer to pass their question to the manager

## When Manager is Busy
Say: "Our travel manager is currently assisting other clients. I'm Zara, your AI travel assistant — I can answer your questions or arrange for the manager to call you back shortly. How can I help?"

---

Always end with a helpful follow-up question to keep the conversation going.
Remember: you represent Javed Travel — every interaction matters."""


@app.route("/")
def home():
    return jsonify({
        "status": "online",
        "agent": "Javed Travel AI Communicator — Zara",
        "powered_by": "Groq + Llama 4"
    })


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data received"}), 400

    user_message = data.get("message", "").strip()
    history = data.get("history", [])  # Previous messages for context

    if not user_message:
        return jsonify({"error": "Empty message"}), 400

    # Build messages array with history
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    # Add conversation history (last 10 exchanges for context)
    for msg in history[-10:]:
        if msg.get("role") in ("user", "assistant") and msg.get("content"):
            messages.append({
                "role": msg["role"],
                "content": msg["content"]
            })

    # Add the new user message
    messages.append({"role": "user", "content": user_message})

    try:
        response = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=messages,
            max_tokens=512,
            temperature=0.7
        )

        reply = response.choices[0].message.content

        return jsonify({
            "status": "success",
            "reply": reply,
            "agent": "Zara"
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "reply": "I'm having a small connection issue. Please call us directly at 0300-1234567 or try again in a moment. Sorry for the inconvenience! 🙏",
            "error": str(e)
        }), 500


@app.route("/status", methods=["GET"])
def status():
    return jsonify({
        "agent": "Zara — Javed Travel AI Communicator",
        "status": "online",
        "model": "Llama 4 Scout via Groq",
        "endpoints": {
            "chat": "POST /chat  {message, history[]}",
            "status": "GET /status"
        }
    })


if __name__ == "__main__":
    print()
    print("=" * 55)
    print("   JAVED TRAVEL — AI COMMUNICATOR AGENT")
    print("=" * 55)
    print("  Agent: Zara | Powered by Groq + Llama 4")
    print("  Listening on: http://localhost:5000")
    print("=" * 55)
    print()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
