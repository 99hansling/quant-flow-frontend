# QuantFlow - Institutional Algorithmic Analytics

![QuantFlow](https://via.placeholder.com/800x400?text=QuantFlow+Dashboard)

**QuantFlow** is a professional Web3 quantitative metrics dashboard designed for high-frequency traders and analysts. It combines real-time market data visualization with AI-powered sentiment analysis to provide actionable alpha signals.

## 🚀 Features

*   **Pro Terminal Interface**: A high-density dashboard featuring real-time charts, signal feeds, and market indicators.
*   **Gemini 2.5 AI Analyst**: Integrated "Smart Quantitative Analyst" that processes chart patterns to generate real-time market sentiment and confidence scores.
*   **Interactive Visualizations**: Dynamic Area/Line charts using `recharts` with neon glow effects and custom gradients.
*   **Live Signal Feed**: Real-time ticker for buy/sell signals (e.g., MACD Crossover, RSI Divergence).
*   **Unda-Inspired Aesthetic**: A premium dark-mode UI featuring glassmorphism, warm neon gradients (Rose/Orange), and modern typography.

## 🛠️ Tech Stack

*   **Frontend**: React 19, TypeScript, Vite
*   **Styling**: Tailwind CSS (Glassmorphism, Custom Animations)
*   **AI Engine**: Google Gemini API (`gemini-2.5-flash`) via `@google/genai` SDK
*   **Charts**: Recharts
*   **Icons**: Lucide React

## 🔮 AI Integration

The dashboard utilizes the **Gemini 2.5 Flash** model to analyze raw market data points.
*   **Input**: JSON array of recent Price/Volume ticks.
*   **Process**: The AI acts as a Senior Quantitative Analyst to detect micro-trends.
*   **Output**: Returns a structured JSON containing a market summary, sentiment (Bullish/Bearish), and a confidence score.

## 🎨 Design System

*   **Primary Palette**: Deep Space Black (`#0f0b1a`), Rose (`#f43f5e`), Orange (`#f97316`).
*   **Typography**: 'Outfit', sans-serif.
*   **Effects**: CSS-based SVG filters for neon chart glows, backdrop-blur for glass cards.

## 📦 Setup

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Set your API Key in `.env`: `API_KEY=your_gemini_api_key`
4.  Run development server: `npm run dev`

---
*© 2024 QuantFlow Systems.*
