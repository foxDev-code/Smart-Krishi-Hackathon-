import React, { useState } from 'react';
import './App.css';
import './LoginPage.css';
import Weather3DVisualization from './Weather3DVisualization';
import Logo from './Logo';
import AnimatedChatBot from './AnimatedChatBot';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'chat':
        return <ChatPage />;
      case 'pest':
        return <PestDetectionPage />;
      case 'weather':
        return <WeatherPage />;
      case 'market':
        return <MarketPage />;
      case 'schemes':
        return <SchemesPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      <Header setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer />
      <AnimatedChatBot 
        onClick={() => setCurrentPage('chat')} 
        isActive={currentPage === 'chat'}
      />
    </div>
  );
}

function Header({ setCurrentPage, currentPage }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-container">
          <Logo />
        </div>
        <nav className="main-nav">
          <button 
            className={currentPage === 'dashboard' ? 'active' : ''}
            onClick={() => setCurrentPage('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={currentPage === 'chat' ? 'active' : ''}
            onClick={() => setCurrentPage('chat')}
          >
            Chat Assistant
          </button>
          <button 
            className={currentPage === 'pest' ? 'active' : ''}
            onClick={() => setCurrentPage('pest')}
          >
            Pest Detection
          </button>
          <button 
            className={currentPage === 'weather' ? 'active' : ''}
            onClick={() => setCurrentPage('weather')}
          >
            Weather
          </button>
          <button 
            className={currentPage === 'market' ? 'active' : ''}
            onClick={() => setCurrentPage('market')}
          >
            Market Prices
          </button>
          <button 
            className={currentPage === 'schemes' ? 'active' : ''}
            onClick={() => setCurrentPage('schemes')}
          >
            Govt. Schemes
          </button>
        </nav>
      </div>
    </header>
  );
}

function HomePage({ setCurrentPage }) {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h2>Welcome to Digital Krishi Assistant</h2>
          <p>Your AI-powered farming companion for smarter agricultural decisions</p>
          <button className="cta-button" onClick={() => setCurrentPage('login')}>
            Get Started
          </button>
        </div>
        <div className="hero-illustration">
          <div className="farm-illustration">
            {/* Simple farm illustration using CSS */}
            <div className="sun"></div>
            <div className="cloud"></div>
            <div className="field">
              <div className="crop"></div>
              <div className="crop"></div>
              <div className="crop"></div>
            </div>
            <div className="farmhouse"></div>
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Chat Assistant</h3>
            <p>Get instant answers to your farming questions in multiple languages</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🐛</div>
            <h3>Pest Detection</h3>
            <p>Upload photos to identify pests and diseases with treatment recommendations</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌦️</div>
            <h3>Weather Forecasting</h3>
            <p>Accurate weather predictions with farming advisories</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Market Intelligence</h3>
            <p>Real-time crop prices and selling recommendations</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>Crop Advisory</h3>
            <p>Personalized crop recommendations based on your location and soil</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📜</div>
            <h3>Government Schemes</h3>
            <p>Stay updated with subsidies, loans, and insurance programs</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginPage() {
  const [mobile, setMobile] = useState('');
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would call the backend API
      console.log(`Login attempted with mobile: ${mobile} and language: ${language}`);
      setIsLoading(false);
      alert(`Login attempted with mobile: ${mobile} and language: ${language}`);
    }, 1500);
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">🌾</div>
          <h1 className="login-title">Digital Krishi Assistant</h1>
          <p className="login-subtitle">Your AI-powered farming companion</p>
        </div>
        
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="mobile" className="form-label">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              className="form-input"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="language" className="form-label">Preferred Language</label>
            <select
              id="language"
              className="form-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="ta">தமிழ் (Tamil)</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="farm-illustration-container">
          <div className="farm-illustration">
            <div className="sun"></div>
            <div className="cloud"></div>
            <div className="field">
              <div className="crop-row">
                <div className="crop"></div>
                <div className="crop"></div>
                <div className="crop"></div>
                <div className="crop"></div>
                <div className="crop"></div>
              </div>
            </div>
            <div className="farmhouse"></div>
            <div className="tree"></div>
            <div className="animal"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    recommendations: [
      { id: 1, task: 'Water wheat fields', time: 'Morning 6-8 AM', priority: 'high' },
      { id: 2, task: 'Check for pest infestation', crop: 'Tomato plants', priority: 'medium' },
      { id: 3, task: 'Apply fertilizer', crop: 'Corn field', priority: 'low' }
    ],
    weather: {
      current: { temp: 28.5, condition: 'Partly Cloudy', humidity: 65 },
      alert: '🌧️ Moderate rain expected tomorrow. Postpone pesticide application.',
      forecast: [
        { day: 'Today', high: 30, low: 22, condition: 'Partly Cloudy' },
        { day: 'Tomorrow', high: 32, low: 24, condition: 'Sunny' }
      ]
    },
    market: {
      crops: [
        { name: 'Wheat', price: 2200, change: 5, trend: 'up' },
        { name: 'Rice', price: 1800, change: -2, trend: 'down' },
        { name: 'Cotton', price: 5500, change: 8, trend: 'up' }
      ],
      update: 'Wheat prices are up by 5% this week. Good time to sell.'
    },
    farmHealth: {
      overall: 85,
      metrics: [
        { name: 'Soil Moisture', value: 45, unit: '%', status: 'good' },
        { name: 'Temperature', value: 28.5, unit: '°C', status: 'good' },
        { name: 'pH Level', value: 6.8, unit: '', status: 'optimal' },
        { name: 'Nutrient Level', value: 75, unit: '%', status: 'good' }
      ]
    },
    sensors: [
      { id: 1, name: 'Soil Moisture Sensor', location: 'Field A', value: 45, unit: '%', status: 'normal' },
      { id: 2, name: 'Temperature Sensor', location: 'Greenhouse', value: 28.5, unit: '°C', status: 'normal' },
      { id: 3, name: 'Humidity Sensor', location: 'Storage', value: 65, unit: '%', status: 'normal' }
    ]
  });

  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, this would fetch live data from APIs
      setDashboardData(prev => ({
        ...prev,
        farmHealth: {
          ...prev.farmHealth,
          overall: Math.min(100, Math.max(0, prev.farmHealth.overall + (Math.random() - 0.5) * 2))
        }
      }));
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return '#4caf50';
      case 'optimal': return '#2196f3';
      case 'normal': return '#ff9800';
      case 'warning': return '#ff5722';
      default: return '#9e9e9e';
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2>Farm Dashboard</h2>
        <div className="dashboard-controls">
          <span className="last-updated">Last updated: {lastUpdated.toLocaleTimeString()}</span>
          <button className="refresh-button" onClick={() => setLastUpdated(new Date())}>
            Refresh Data
          </button>
        </div>
      </div>
      
      <div className="dashboard-grid">
        {/* Recommendations Card */}
        <div className="dashboard-card">
          <h3>Today's Recommendations</h3>
          <ul className="recommendations-list">
            {dashboardData.recommendations.map(rec => (
              <li key={rec.id} className={`recommendation-item ${getPriorityClass(rec.priority)}`}>
                <span className="task">{rec.task}</span>
                {rec.time && <span className="time">{rec.time}</span>}
                {rec.crop && <span className="crop">{rec.crop}</span>}
                <span className={`priority-badge ${getPriorityClass(rec.priority)}`}>
                  {rec.priority}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Weather Card */}
        <div className="dashboard-card">
          <h3>Weather</h3>
          <div className="weather-current">
            <div className="temperature">{dashboardData.weather.current.temp}°C</div>
            <div className="condition">{dashboardData.weather.current.condition}</div>
            <div className="humidity">Humidity: {dashboardData.weather.current.humidity}%</div>
          </div>
          <div className="weather-alert">
            {dashboardData.weather.alert}
          </div>
          <div className="weather-forecast">
            {dashboardData.weather.forecast.map((day, index) => (
              <div key={index} className="forecast-item">
                <span className="day">{day.day}</span>
                <span className="temps">{day.high}°/{day.low}°</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Market Card */}
        <div className="dashboard-card">
          <h3>Market Prices</h3>
          <div className="market-update">
            {dashboardData.market.update}
          </div>
          <div className="crop-prices">
            {dashboardData.market.crops.map((crop, index) => (
              <div key={index} className="crop-price">
                <span className="crop-name">{crop.name}</span>
                <span className="price">₹{crop.price}/qt</span>
                <span className={`trend ${crop.trend}`}>
                  {crop.trend === 'up' ? '↗' : '↘'} {Math.abs(crop.change)}%
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Farm Health Card */}
        <div className="dashboard-card">
          <h3>Farm Health</h3>
          <div className="health-overall">
            <div className="health-score">{Math.round(dashboardData.farmHealth.overall)}%</div>
            <div className="health-status">
              {dashboardData.farmHealth.overall >= 80 ? 'Excellent' : 
               dashboardData.farmHealth.overall >= 60 ? 'Good' : 
               dashboardData.farmHealth.overall >= 40 ? 'Fair' : 'Poor'}
            </div>
          </div>
          <div className="health-metrics">
            {dashboardData.farmHealth.metrics.map((metric, index) => (
              <div key={index} className="metric">
                <span className="metric-name">{metric.name}</span>
                <span className="metric-value">{metric.value}{metric.unit}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Sensor Data Card */}
        <div className="dashboard-card">
          <h3>Sensor Data</h3>
          <div className="sensor-list">
            {dashboardData.sensors.map(sensor => (
              <div key={sensor.id} className="sensor-item">
                <div className="sensor-header">
                  <span className="sensor-name">{sensor.name}</span>
                  <span className="sensor-location">{sensor.location}</span>
                </div>
                <div className="sensor-data">
                  <span className="sensor-value">{sensor.value}{sensor.unit}</span>
                  <span className={`sensor-status ${sensor.status}`}>{sensor.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Quick Actions Card */}
        <div className="dashboard-card">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <button className="action-button">Water Crops</button>
            <button className="action-button">Check Pest Alerts</button>
            <button className="action-button">View Market Trends</button>
            <button className="action-button">Sensor Diagnostics</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your Digital Krishi Assistant. How can I help you today? Ask me about crops, weather, pests, markets, or government schemes!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      console.log('Sending request to:', `${process.env.REACT_APP_API_URL}/api/chat`);
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: newMessages,
          userId: 'user_123' // In a real app, this would be the actual user ID
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        const assistantMessage = { 
          role: 'assistant', 
          content: data.choices[0].message.content
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Invalid response format from API');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Chat Error:', error);
      setError(error.message);
      const errorMessage = { 
        role: 'assistant', 
        content: `Sorry, I encountered an error: ${error.message}. Please try again.` 
      };
      setMessages(prev => [...prev, errorMessage]);
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      { role: 'assistant', content: 'Hello! I am your Digital Krishi Assistant. How can I help you today? Ask me about crops, weather, pests, markets, or government schemes!' }
    ]);
    setError(null);
  };

  return (
    <div className="chat-page">
      <h2>AI Chat Assistant</h2>
      <div className="chat-container">
        <div className="chat-header">
          <button onClick={clearChat} className="clear-button">
            Clear Chat
          </button>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <div className="message-content">
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="message assistant">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                Thinking...
              </div>
            </div>
          )}
        </div>
        {error && (
          <div className="chat-error">
            Error: {error}
          </div>
        )}
        <div className="chat-input">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about crops, weather, pests, markets, government schemes..."
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button 
            onClick={sendMessage} 
            disabled={loading || !input.trim()}
            className="send-button"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

function PestDetectionPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      // In a real implementation, this would call your backend API
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/upload-image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      setResult(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Upload error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="pest-detection-page">
      <h2>Pest & Disease Detection</h2>
      <div className="upload-section">
        <div className="upload-container">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
            id="image-upload"
            disabled={loading}
          />
          <label htmlFor="image-upload" className="upload-button">
            Choose Image
          </label>
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}
          <button 
            onClick={handleUpload} 
            disabled={!selectedFile || loading}
            className="analyze-button"
          >
            {loading ? 'Analyzing...' : 'Analyze Image'}
          </button>
        </div>
        
        {result && (
          <div className="analysis-results">
            <h3>Detection Results</h3>
            <div className="result-card">
              <p><strong>Disease:</strong> {result.disease}</p>
              <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%</p>
              <p><strong>Recommendation:</strong> {result.recommendation}</p>
              {result.safety && (
                <div className="safety-warning">
                  <strong>Safety:</strong> {result.safety}
                </div>
              )}
              <div className="next-steps">
                <strong>Next Steps:</strong>
                <ol>
                  {result.nextSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function WeatherPage() {
  const [weatherData, setWeatherData] = useState({
    current: {
      temp: 28.5,
      humidity: 65,
      wind_speed: 12.3,
      description: 'Partly cloudy',
      rain: { '1h': 0.5 }
    },
    daily: [
      { day: 'Today', high: 30, low: 22, condition: 'Partly cloudy' },
      { day: 'Tomorrow', high: 32, low: 24, condition: 'Sunny' },
      { day: 'Day 3', high: 29, low: 21, condition: 'Rainy' },
      { day: 'Day 4', high: 27, low: 20, condition: 'Thunderstorms' },
      { day: 'Day 5', high: 31, low: 23, condition: 'Mostly sunny' }
    ]
  });

  // Function to get weather icon based on condition
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return '☀️';
      case 'partly cloudy': return '⛅';
      case 'cloudy': return '☁️';
      case 'rainy': return '🌧️';
      case 'thunderstorms': return '⛈️';
      case 'mostly sunny': return '🌤️';
      default: return '🌤️';
    }
  };

  // Function to get advice based on current weather
  const getWeatherAdvice = () => {
    const { temp, humidity, wind_speed, rain } = weatherData.current;
    let advice = [];
    
    if (temp > 35) {
      advice.push('🌡️ Extreme heat warning! Irrigate crops early morning or late evening.');
    } else if (temp < 5) {
      advice.push('🧊 Cold weather alert! Protect sensitive crops from frost.');
    }
    
    if (humidity > 80) {
      advice.push('💧 High humidity! Monitor for fungal diseases in crops.');
    }
    
    if (wind_speed > 20) {
      advice.push('💨 Strong winds! Secure young plants and check for damage.');
    }
    
    if (rain && rain['1h'] > 2) {
      advice.push('🌧️ Heavy rainfall! Ensure proper drainage to prevent waterlogging.');
    }
    
    if (advice.length === 0) {
      advice.push('🌤️ Weather conditions are favorable for most farming activities.');
    }
    
    return advice;
  };

  return (
    <div className="weather-page">
      <h2>Weather Advisory</h2>
      <div className="weather-container">
        <div className="weather-3d">
          <Weather3DVisualization weatherData={weatherData} />
        </div>
        
        <div className="current-weather">
          <h3>Current Conditions</h3>
          <div className="weather-main">
            <div className="temperature">{weatherData.current.temp}°C</div>
            <div className="condition">{getWeatherIcon(weatherData.current.description)} {weatherData.current.description}</div>
            <div className="details">
              <p>💧 Humidity: {weatherData.current.humidity}%</p>
              <p>💨 Wind: {weatherData.current.wind_speed} km/h</p>
              {weatherData.current.rain && <p>🌧️ Rain (last hour): {weatherData.current.rain['1h']}mm</p>}
            </div>
          </div>
        </div>
        
        <div className="forecast">
          <h3>5-Day Forecast</h3>
          <div className="forecast-grid">
            {weatherData.daily.map((day, index) => (
              <div key={index} className="forecast-day">
                <div className="day-name">{day.day}</div>
                <div className="day-condition">{getWeatherIcon(day.condition)} {day.condition}</div>
                <div className="day-temp">
                  <span className="high">{day.high}°</span>
                  <span className="low">{day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="farming-advice">
          <h3>Dynamic Farming Advisory</h3>
          <div className="advice-content">
            <ul>
              {getWeatherAdvice().map((advice, index) => (
                <li key={index}>{advice}</li>
              ))}
            </ul>
            <div className="additional-info">
              <h4>Today's Recommendations:</h4>
              <div className="recommendations">
                <div className="recommendation-card">
                  <h5>🌱 Planting</h5>
                  <p>Good conditions for transplanting</p>
                </div>
                <div className="recommendation-card">
                  <h5>💧 Irrigation</h5>
                  <p>Water in early morning</p>
                </div>
                <div className="recommendation-card">
                  <h5>🌾 Harvesting</h5>
                  <p>Favorable weather window</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketPage() {
  const [marketData] = useState([
    { crop: 'Wheat', currentPrice: 2200, trend: 'up', change: 5 },
    { crop: 'Rice', currentPrice: 1800, trend: 'down', change: 2 },
    { crop: 'Cotton', currentPrice: 5500, trend: 'up', change: 8 },
    { crop: 'Sugarcane', currentPrice: 320, trend: 'stable', change: 0 },
    { crop: 'Maize', currentPrice: 1900, trend: 'up', change: 3 }
  ]);

  return (
    <div className="market-page">
      <h2>Market Price Information</h2>
      <div className="market-container">
        <div className="price-table">
          <table>
            <thead>
              <tr>
                <th>Crop</th>
                <th>Current Price (₹/quintal)</th>
                <th>Trend</th>
                <th>Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {marketData.map((item, index) => (
                <tr key={index}>
                  <td>{item.crop}</td>
                  <td>₹{item.currentPrice}</td>
                  <td>
                    <span className={`trend ${item.trend}`}>
                      {item.trend === 'up' ? '↗️' : item.trend === 'down' ? '↘️' : '➡️'} {item.change}%
                    </span>
                  </td>
                  <td>
                    {item.trend === 'up' ? 'Good time to sell' : 
                     item.trend === 'down' ? 'Hold for better prices' : 
                     'Stable market'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="market-insights">
          <h3>Market Insights</h3>
          <ul>
            <li>Wheat prices are rising due to reduced supply from northern states</li>
            <li>Cotton demand is increasing with upcoming festival season</li>
            <li>Rice prices are slightly declining due to good harvest predictions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function SchemesPage() {
  const [schemes] = useState([
    {
      id: 1,
      title: 'Pradhan Mantri Fasal Bima Yojana',
      description: 'Crop insurance scheme to provide financial support to farmers in case of crop failure',
      category: 'Insurance',
      deadline: '30 Nov 2025'
    },
    {
      id: 2,
      title: 'Pradhan Mantri Kisan Samman Nidhi',
      description: '₹6000 per year to all farmer families with cultivable land up to 2 hectares',
      category: 'Income Support',
      deadline: 'Ongoing'
    },
    {
      id: 3,
      title: 'Paramparagat Krishi Vikas Yojana',
      description: 'Promotion of organic farming through cluster approach',
      category: 'Organic Farming',
      deadline: '31 Mar 2026'
    },
    {
      id: 4,
      title: 'Kisan Credit Card Scheme',
      description: 'Credit facility for farmers for cultivation and other needs',
      category: 'Credit',
      deadline: 'Ongoing'
    }
  ]);

  return (
    <div className="schemes-page">
      <h2>Government Schemes & Alerts</h2>
      <div className="schemes-container">
        <div className="schemes-grid">
          {schemes.map((scheme) => (
            <div key={scheme.id} className="scheme-card">
              <div className="scheme-header">
                <h3>{scheme.title}</h3>
                <span className="category">{scheme.category}</span>
              </div>
              <p>{scheme.description}</p>
              <div className="scheme-footer">
                <span className="deadline">Deadline: {scheme.deadline}</span>
                <button className="apply-button">Apply Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>&copy; 2025 Digital Krishi Assistant. Empowering farmers with AI technology.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}

export default App;