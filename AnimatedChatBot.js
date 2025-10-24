import React, { useState, useEffect } from 'react';
import './AnimatedChatBot.css';

const AnimatedChatBot = ({ onClick, isActive }) => {
  const [bubbleText, setBubbleText] = useState('Ask me anything! 🌱');
  
  const bubbleMessages = [
    'Ask me anything! 🌱',
    'Need farming tips? 🌾',
    'Hello there! 👋',
    'I can help! 💬',
    'Crop advice here! 🌽'
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isActive) {
        const randomIndex = Math.floor(Math.random() * bubbleMessages.length);
        setBubbleText(bubbleMessages[randomIndex]);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isActive]);
  
  return (
    <div className={`chatbot-container ${isActive ? 'active' : ''}`} onClick={onClick}>
      <div className="chatbot-body">
        <div className="chatbot-eye left"></div>
        <div className="chatbot-eye right"></div>
        <div className="chatbot-mouth"></div>
      </div>
      <div className="chatbot-arm left-arm"></div>
      <div className="chatbot-arm right-arm"></div>
      <div className="chatbot-leg left-leg"></div>
      <div className="chatbot-leg right-leg"></div>
      <div className="chat-bubble">
        <span className="bubble-text">{bubbleText}</span>
      </div>
    </div>
  );
};

export default AnimatedChatBot;