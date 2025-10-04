
# 🩺 HealthWise - AI-Powered Health Assistant

HealthWise is an intelligent healthcare platform that leverages AI to predict diseases based on user-reported symptoms, provides personalized remedies and precautions, recommends the best doctors and hospitals nearby, and enables direct consultation with healthcare professionals—all in one seamless experience.



## Features

- AI-Powered Disease Prediction: Analyze symptoms using advanced machine learning models
- Personalized Remedies & Precautions: Get tailored health advice based on your condition
- Doctor Recommendations: Find the best specialists near your location
- Hospital Finder: Discover top-rated hospitals in your vicinity
- Direct Doctor Consultation: Contact doctors directly through our integrated communication system
- User-Friendly Interface: Clean, responsive design built with modern web technologies


## Tech Stack

**Framework:** Next.js 14 (App Router)

**Package Manager:** pnpm

**Styling:** Tailwind CSS

**AI/ML:** NextJS-based backend with disease prediction models (integrated via API)


**Maps & Location:** Google Maps API for location-based services

**Database:** MongoDB

**Authentication:** bycrpt, JWT Token

**Deployment:** Vercel





## Installation

**Prerequisites:**
- Node.js (v18 or higher)
- pnpm (v8 or higher)
- Git

Clone the Repository

```bash
git clone https://github.com/bhavy-sharma/HealtWise.git
cd HealtWise
```

Install Dependencies

```bash
pnpm install
```

## Environment Variables
Create a .env.local file in the root directory and add the following variables:

```bash
GOOGLE_API_KEY=YOUR_API_KEY
MONGODB_URI=YOUR_API_KEY
JWT_SECRET=YOUR_API_KEY
JWT_EXPIRE=YOUR_API_KEY
ADMIN_EMAIL=YOUR_API_KEY
ADMIN_PASSWORD=YOUR_API_KEY
```

Run the Development Server
```bash
pnpm dev
```

Open http://localhost:3000 in your browser to see the application.

## 📱 Usage

- Symptom Input: Enter your symptoms through the intuitive form interface
- AI Analysis: Our system analyzes your symptoms using trained ML models
- Results Display: View predicted diseases with confidence scores
- Personalized Advice: Get tailored remedies and precautions for your condition
- Find Care: Discover recommended doctors and hospitals near you
- Consult: Contact healthcare professionals directly through the platform



## Contributing

Contributions are always welcome!

- Fork the repository
- Create your feature branch (git checkout -b feature/AmazingFeature)
- Commit your changes (git commit -m 'Add some AmazingFeature')
- Push to the branch (git push origin feature/AmazingFeature)
- Open a Pull Request

## Support

Made with ❤️ and Next.js




