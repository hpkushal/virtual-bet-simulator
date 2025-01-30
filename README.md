# Virtual Bet Simulator 🎲

A risk-awareness gambling simulator where players aim to turn $1,000 into $10,000 while managing their risk profile. Features humorous personas and real-time risk assessment.

## Prerequisites 📋

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation & Setup 🚀

1. Clone the repository:
```bash
git clone https://github.com/hpkushal/virtual-bet-simulator.git
cd virtual-bet-simulator
```

2. Install dependencies:
```bash
npm install
```

## Running the Game 🎮

1. Start the server:
```bash
npm start
```

2. Open your web browser and navigate to:
```
http://localhost:3000
```

Note: If port 3000 is already in use, the server will automatically try the next available port. Check your terminal for the correct URL.

To stop the server: Press `Ctrl+C` in the terminal.

## Development Mode 🛠️

To run the game with auto-reload during development:
```bash
npm run dev
```

## Features ✨

- 🎮 Start with $1,000 and aim for $10,000
- 👥 Dynamic risk personas that react to your betting style
- 📊 Real-time risk assessment visualization
- 🎲 Multiple betting events with different odds
- 🎯 Interactive and responsive UI
- 📱 Mobile-friendly design
- 🔄 Continuous gameplay with reset option

## Game Rules 📜

| Objective | Details |
|-----------|---------|
| Starting Balance | $1,000 |
| Win Milestone | Reach $10,000 |
| Loss Condition | Balance reaches $0 |
| Gameplay | Continuous until reset |

### Betting Events 🎲

| Event | Odds | Win Probability |
|-------|------|----------------|
| Coin Flip | 2x | 50% |
| Dice Roll | 6x | 16.6% |
| Roulette | 35x | 2.7% |
| Sports Match | 3.5x | 30% |

### Risk Personas 👥

| Persona | Risk Range | Style |
|---------|------------|-------|
| Baby Betsy | 0-30% | Conservative |
| Midlife Crisis Mike | 31-70% | Moderate |
| YOLO Yolanda | 71-100% | Aggressive |

## Troubleshooting 🔧

| Issue | Solution |
|-------|----------|
| Port 3000 in use | Server will automatically try next port |
| Game not loading | Check if JavaScript is enabled |
| Styles missing | Check internet connection (Tailwind CDN) |
| Server won't start | Try `killall node` then restart |
| Animations stuck | Refresh page (Ctrl+F5/Cmd+R) |

## Project Structure 📁

```
virtual-bet-simulator/
├── src/
│   ├── js/
│   │   ├── events.js        # Game events configuration
│   │   ├── personas.js      # Risk personas logic
│   │   ├── game.js          # Core game mechanics
│   │   └── animations.js    # UI animations
│   └── css/
│       ├── styles.css       # Custom styles
│       └── animations.css   # Animation definitions
├── public/
│   ├── assets/             # Static resources
│   └── index.html          # Main entry point
└── server.js              # Express server configuration
```

## Documentation 📚

- [User Guide](docs/guides/USER_GUIDE.md) - How to play the game
- [Technical Guide](docs/guides/TECHNICAL_GUIDE.md) - Technical details and formulas
- [Developer Guide](docs/DEVELOPER.md) - Development and contribution guidelines

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Safety Note ⚠️

This is a simulation for educational purposes only. It's designed to teach risk management in a fun way and does not involve real money. 
