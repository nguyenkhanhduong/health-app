import { useState } from 'react'

export const TextEffect = () => {
  const [selectedEffect, setSelectedEffect] = useState<string>('gradient')

  const effects = [
    { id: 'gradient', name: 'Gradient Text' },
    { id: 'glow', name: 'Glow Effect' },
    { id: 'outline', name: 'Outline Text' },
    { id: 'shadow', name: '3D Shadow' },
    { id: 'glitch', name: 'Glitch Effect' },
    { id: 'wave', name: 'Wave Animation' },
    { id: 'image-fill', name: 'Image Fill' },
    { id: 'gold', name: 'Gold Metallic' },
    { id: 'holographic', name: 'Holographic' },
    { id: 'pattern', name: 'Pattern Fill' },
    { id: 'ice-3d', name: '3D Ice Glass' },
  ]

  const getEffectClass = (effectId: string) => {
    switch (effectId) {
      case 'gradient':
        return 'text-gradient'
      case 'glow':
        return 'text-glow'
      case 'outline':
        return 'text-outline'
      case 'shadow':
        return 'text-3d'
      case 'glitch':
        return 'text-glitch'
      case 'wave':
        return 'text-wave'
      case 'image-fill':
        return 'text-image-fill'
      case 'gold':
        return 'text-gold'
      case 'holographic':
        return 'text-holographic'
      case 'pattern':
        return 'text-pattern'
      case 'ice-3d':
        return 'text-ice-3d'
      default:
        return ''
    }
  }

  const renderTextWithEffect = (text: string) => {
    return text.split('').map((char, index) => {
      if (char === ' ') {
        return <span key={index} className="char-space">&nbsp;</span>
      }
      return (
        <span 
          key={index} 
          className={`char ${getEffectClass(selectedEffect)}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {char}
        </span>
      )
    })
  }

  return (
    <div className="text-effect-page">
      {/* Background Image */}
      <div className="background-overlay"></div>

      <div className="content-wrapper">
        {/* Header */}
        <header className="header">
          <h1 className="title text-gradient">Text Effect Studio</h1>
          <p className="subtitle">Create stunning text effects with beautiful backgrounds</p>
        </header>

        {/* Effect Selector */}
        <div className="effect-selector">
          {effects.map((effect) => (
            <button
              key={effect.id}
              className={`effect-btn ${selectedEffect === effect.id ? 'active' : ''}`}
              onClick={() => setSelectedEffect(effect.id)}
            >
              {effect.name}
            </button>
          ))}
        </div>

        {/* Main Display Area */}
        <div className="display-area">
          <h2 className="effect-text">
            {renderTextWithEffect('Beautiful Text Effects')}
          </h2>
          <p className="effect-description">
            {selectedEffect === 'gradient' && 'Smooth gradient colors flowing through your text'}
            {selectedEffect === 'glow' && 'Radiant glow that makes text stand out'}
            {selectedEffect === 'outline' && 'Bold outline for maximum visibility'}
            {selectedEffect === 'shadow' && '3D depth with layered shadows'}
            {selectedEffect === 'glitch' && 'Digital glitch animation effect'}
            {selectedEffect === 'wave' && 'Animated wave motion'}
            {selectedEffect === 'image-fill' && 'Beautiful background image inside your text'}
            {selectedEffect === 'gold' && 'Luxurious gold metallic texture effect'}
            {selectedEffect === 'holographic' && 'Mesmerizing rainbow holographic shimmer'}
            {selectedEffect === 'pattern' && 'Geometric pattern fill with depth'}
            {selectedEffect === 'ice-3d' && '3D ice glass with textured background and depth'}
          </p>
        </div>

        {/* Info Cards */}
        <div className="info-cards">
          <div className="info-card">
            <h3>🎨 Customizable</h3>
            <p>Choose from multiple effect styles</p>
          </div>
          <div className="info-card">
            <h3>⚡ Animated</h3>
            <p>Dynamic animations that catch the eye</p>
          </div>
          <div className="info-card">
            <h3>📱 Responsive</h3>
            <p>Works perfectly on all devices</p>
          </div>
        </div>
      </div>

      <style>{`
        .text-effect-page {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background-image: url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1920');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }

        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(20, 20, 60, 0.8) 100%);
          z-index: 1;
        }

        .content-wrapper {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .title {
          font-size: 4rem;
          font-weight: 900;
          margin-bottom: 1rem;
        }

        .subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 300;
        }

        .effect-selector {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 4rem;
        }

        .effect-btn {
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.2);
          color: white;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        .effect-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
        }

        .effect-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: transparent;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .display-area {
          text-align: center;
          margin-bottom: 4rem;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .effect-text {
          font-size: 5rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          display: inline-block;
        }

        /* Individual character styling */
        .char {
          display: inline-block;
          font-size: 5rem;
          font-weight: 900;
        }

        .char-space {
          display: inline-block;
          width: 1.5rem;
        }
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .title {
          font-size: 4rem;
          font-weight: 900;
          margin-bottom: 1rem;
        }

        .subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 300;
        }

        .effect-selector {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 4rem;
        }

        .effect-btn {
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.2);
          color: white;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        .effect-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
        }

        .effect-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: transparent;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .display-area {
          text-align: center;
          margin-bottom: 4rem;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .effect-text {
          font-size: 5rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .effect-description {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          font-style: italic;
        }

        /* Text Effects */
        .text-gradient {
          background: linear-gradient(45deg, #ff6ec4, #7873f5, #4facfe);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .text-glow {
          color: #fff;
          text-shadow: 
            0 0 10px #fff,
            0 0 20px #fff,
            0 0 30px #fff,
            0 0 40px #ff00de,
            0 0 70px #ff00de,
            0 0 80px #ff00de,
            0 0 100px #ff00de,
            0 0 150px #ff00de;
          animation: glowPulse 2s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .text-outline {
          color: transparent;
          -webkit-text-stroke: 3px #fff;
          text-shadow: 
            3px 3px 0 #ff00de,
            6px 6px 0 #00f7ff;
        }

        .text-3d {
          color: #fff;
          text-shadow:
            0 1px 0 #ccc,
            0 2px 0 #c9c9c9,
            0 3px 0 #bbb,
            0 4px 0 #b9b9b9,
            0 5px 0 #aaa,
            0 6px 1px rgba(0,0,0,.1),
            0 0 5px rgba(0,0,0,.1),
            0 1px 3px rgba(0,0,0,.3),
            0 3px 5px rgba(0,0,0,.2),
            0 5px 10px rgba(0,0,0,.25),
            0 10px 10px rgba(0,0,0,.2),
            0 20px 20px rgba(0,0,0,.15);
        }

        .text-glitch {
          color: #fff;
          position: relative;
          animation: glitch 1s linear infinite;
        }

        @keyframes glitch {
          2%, 64% {
            transform: translate(2px, 0) skew(0deg);
          }
          4%, 60% {
            transform: translate(-2px, 0) skew(0deg);
          }
          62% {
            transform: translate(0, 0) skew(5deg);
          }
        }

        .text-glitch::before,
        .text-glitch::after {
          content: 'Beautiful Text Effects';
          position: absolute;
          left: 0;
        }

        .text-glitch::before {
          animation: glitchTop 1s linear infinite;
          clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
          -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
        }

        @keyframes glitchTop {
          2%, 64% {
            transform: translate(2px, -2px);
          }
          4%, 60% {
            transform: translate(-2px, 2px);
          }
          62% {
            transform: translate(13px, -1px) skew(-13deg);
          }
        }

        .text-glitch::after {
          animation: glitchBottom 1.5s linear infinite;
          clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
          -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
        }

        @keyframes glitchBottom {
          2%, 64% {
            transform: translate(-2px, 0);
          }
          4%, 60% {
            transform: translate(-2px, 0);
          }
          62% {
            transform: translate(-22px, 5px) skew(21deg);
          }
        }

        .text-wave {
          color: #fff;
          display: inline-block;
        }

        .text-wave {
          animation: wave 2s ease-in-out infinite;
        }

        @keyframes wave {
          0%, 100% {
            transform: translateY(0);
          }
          25% {
            transform: translateY(-20px);
          }
          75% {
            transform: translateY(20px);
          }
        }

        /* New Effects - Background Image Text */
        .text-image-fill {
          background-image: url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920');
          background-size: cover;
          background-position: center;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: brightness(1.2) contrast(1.1);
          position: relative;
        }

        .text-image-fill::before {
          content: 'Beautiful Text Effects';
          position: absolute;
          left: 0;
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.3);
          -webkit-text-fill-color: transparent;
          z-index: -1;
        }

        .text-gold {
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 25%, #d4af37 50%, #ffd700 75%, #ffed4e 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: goldShine 3s ease-in-out infinite;
          filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.5));
          text-shadow: 
            0 0 10px rgba(255, 215, 0, 0.8),
            0 0 20px rgba(255, 215, 0, 0.6),
            0 0 30px rgba(255, 215, 0, 0.4);
        }

        @keyframes goldShine {
          0%, 100% { 
            background-position: 0% 50%;
            filter: brightness(1) drop-shadow(0 0 20px rgba(255, 215, 0, 0.5));
          }
          50% { 
            background-position: 100% 50%;
            filter: brightness(1.3) drop-shadow(0 0 30px rgba(255, 215, 0, 0.8));
          }
        }

        .text-holographic {
          background: linear-gradient(
            45deg,
            #ff0080,
            #ff8c00,
            #40e0d0,
            #7b68ee,
            #ff1493,
            #00bfff,
            #ff0080
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: holographicShift 4s ease-in-out infinite;
          position: relative;
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
        }

        @keyframes holographicShift {
          0%, 100% {
            background-position: 0% 50%;
            filter: hue-rotate(0deg) drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
          }
          25% {
            background-position: 50% 100%;
            filter: hue-rotate(90deg) drop-shadow(0 0 15px rgba(255, 100, 255, 0.6));
          }
          50% {
            background-position: 100% 50%;
            filter: hue-rotate(180deg) drop-shadow(0 0 20px rgba(100, 255, 255, 0.7));
          }
          75% {
            background-position: 50% 0%;
            filter: hue-rotate(270deg) drop-shadow(0 0 15px rgba(255, 255, 100, 0.6));
          }
        }

        .text-pattern {
          background-image: 
            repeating-linear-gradient(
              45deg,
              #667eea 0px,
              #667eea 10px,
              #764ba2 10px,
              #764ba2 20px,
              #f093fb 20px,
              #f093fb 30px,
              #4facfe 30px,
              #4facfe 40px
            );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: patternMove 5s linear infinite;
          filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3));
        }

        @keyframes patternMove {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }

        /* 3D Ice Glass Effect - Image Inside Text */
        .text-ice-3d {
          /* Main text with image inside */
          background-image: url('https://images.unsplash.com/photo-1708549359994-59d8a6156a9c?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRleHQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww%20100w,%20https://images.unsplash.com/photo-1708549359994-59d8a6156a9c?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRleHQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww%20200w,%20https://images.unsplash.com/photo-1708549359994-59d8a6156a9c?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRleHQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww%20300w,%20https://images.unsplash.com/photo-1708549359994-59d8a6156a9c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRleHQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww%20400w,%20https://images.unsplash.com/photo-1708549359994-59d8a6156a9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRleHQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww%20500w,%20https://images.unsplash.com/photo-1708549359994-59d8a6156a9c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRleHQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww%20600w,%20https://images.unsplash.com/photo-1708549359994-59d8a6156a9c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRleHQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww%20700w,%20https://images.unsplash.com/photo-1708549359994-59d8a6156a9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRleHQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww%20800w,%20https://images.unsplash.com/photo-1708549359994-59d8a6156a9c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRleHQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww%20900w,%20https://images.unsplash.com/photo-1708549359994-59d8a6156a9c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRleHQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww%201000w,%20https://images.unsplash.com/photo-1708549359994-59d8a6156a9c?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRleHQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww%201200w,%20https://images.unsplash.com/photo-1708549359994-59d8a6156a9c?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRleHQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww%201400w,%20https://images.unsplash.com/photo-1708549359994-59d8a6156a9c?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRleHQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww%201600w,%20https://images.unsplash.com/photo-1708549359994-59d8a6156a9c?w=1800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRleHQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww%201800w,%20https://images.unsplash.com/photo-1708549359994-59d8a6156a9c?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRleHQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww%202000w');
          background-size: cover;
          background-position: center;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          filter: brightness(1.4) contrast(1.3) saturate(1.6);
          
          /* Subtle border to define text shape */
          -webkit-text-stroke: 2px rgba(0, 212, 255, 0.6);
          
          /* Simple 3D shadow */
          filter: 
            brightness(1.4) 
            contrast(1.3) 
            saturate(1.6)
            drop-shadow(2px 2px 0 #0099cc)
            drop-shadow(4px 4px 0 #0077aa)
            drop-shadow(6px 6px 0 #006699)
            drop-shadow(8px 8px 15px rgba(0, 0, 0, 0.5));
        }

        .info-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .info-card {
          background: rgba(255, 255, 255, 0.08);
          padding: 2rem;
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .info-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .info-card h3 {
          color: #fff;
          font-size: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .info-card p {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .title {
            font-size: 2.5rem;
          }

          .effect-text {
            font-size: 2.5rem;
          }

          .effect-selector {
            gap: 0.5rem;
          }

          .effect-btn {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }

          .content-wrapper {
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </div>
  )
}
