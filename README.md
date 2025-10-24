# Digital Krishi Assistant

An AI-powered agricultural assistant for farmers.

## Features

- Animated cartoonish login page with farm-themed illustrations
- Intelligent AI chatbot powered by OpenAI for multilingual agricultural advice
- Crop advisory dashboard with recommendations and sowing periods
- Pest and disease detection with image upload capability
- Weather advisory panel with 3D visualizations
- Market price information with trends and recommendations
- Government scheme alerts for subsidies and loans
- Multilingual support for regional accessibility
- Interactive farm health tracking with visual indicators
- Responsive design optimized for mobile devices

## Technology Stack

- **Frontend**: React with modern UI components
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Redis caching
- **AI Services**: OpenAI GPT models
- **Computer Vision**: TensorFlow/PyTorch or Vision APIs
- **Weather Data**: OpenWeatherMap or similar providers
- **Authentication**: JWT with SMS OTP option

## Setup Instructions

1. Clone the repository
2. Install dependencies for both frontend and backend
3. Set up environment variables
4. Run the development servers

## Project Structure

```
.
├── backend/
│   ├── server.js           # Main Express server
│   ├── package.json        # Node.js dependencies
│   └── .env.example        # Environment variables template
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js          # Main App component
│   │   ├── App.css         # Main styles
│   │   └── index.js        # Entry point
│   ├── package.json        # React dependencies
│   └── .env               # Frontend environment variables
└── README.md
```