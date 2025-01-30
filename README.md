# Virtual Bet Simulator 🎲

A risk-awareness gambling simulator where players aim to turn $1,000 into $10,000 while managing their risk profile. Features humorous personas and real-time risk assessment.

**Developed by kparameshwara** ��‍💻

## Quick Start 🚀

1. Clone the repository:
```bash
git clone https://github.com/hpkushal/virtual-bet-simulator.git
cd virtual-bet-simulator
```

2. Open `public/index.html` in your browser:
   - **Chrome/Edge**: Double-click the file
   - **Firefox**: Right-click > Open With > Firefox
   - **Safari**: Right-click > Open With > Safari

No installation needed! The game uses CDN for dependencies.

## Features ✨

- 🎮 Start with $1,000 and aim for $10,000
- 👥 Dynamic risk personas that react to your betting style
- 📊 Real-time risk assessment visualization
- 🎲 Multiple betting events with different odds
- 🎯 Interactive and responsive UI
- 📱 Mobile-friendly design

## Game Rules 📜

| Objective | Details |
|-----------|---------|
| Starting Balance | $1,000 |
| Win Condition | Reach $10,000 |
| Loss Condition | Balance reaches $0 |

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

## Project Structure 📁

```
virtual-bet-simulator/
├── src/
│   ├── js/
│   │   ├── events.js        # Game events configuration
│   │   ├── personas.js      # Risk personas logic
│   │   ├── game.js          # Core game mechanics
│   │   └── animations.js    # UI animations
│   ├── css/
│   │   ├── styles.css       # Custom styles
│   │   └── animations.css   # Animation definitions
│   └── components/          # Future component abstractions
├── public/
│   ├── assets/             # Images and static resources
│   └── index.html          # Main entry point
└── docs/
    ├── guides/
    │   ├── USER_GUIDE.md    # Detailed user guide
    │   └── TECHNICAL_GUIDE.md # Technical documentation
    └── DEVELOPER.md         # Developer documentation
```

## Documentation 📚

- [User Guide](docs/guides/USER_GUIDE.md) - How to play the game
- [Technical Guide](docs/guides/TECHNICAL_GUIDE.md) - Technical details and formulas
- [Developer Guide](docs/DEVELOPER.md) - Development and contribution guidelines

## Troubleshooting 🛠️

| Issue | Solution |
|-------|----------|
| Game not loading | Check if JavaScript is enabled |
| Styles missing | Check internet connection (Tailwind CDN) |
| Animations stuck | Refresh page (Ctrl+F5/Cmd+R) |
| Share not working | Allow pop-ups for Twitter |

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
