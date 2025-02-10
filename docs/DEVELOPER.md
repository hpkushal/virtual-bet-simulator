# Product Requirements Documentation

## Project Overview

The Risk & Reward Simulator is a web-based gambling simulator designed to teach risk management through interactive gameplay and humorous personas. The project uses vanilla JavaScript with a modular architecture, Tailwind CSS for styling, and modern web animations.

## Architecture

The project follows a modular architecture with clear separation of concerns:

```
risk-evaluator/
├── src/
│   ├── js/
│   │   ├── events.js        # Betting events and odds management
│   │   ├── personas.js      # Risk personas and behavior logic
│   │   ├── game.js          # Core game mechanics and state
│   │   └── animations.js    # UI animations and transitions
│   ├── css/
│   │   ├── styles.css       # Custom styles
│   │   └── animations.css   # Animation definitions
│   └── components/          # Future component abstractions
├── public/
│   ├── assets/             # Static resources
│   └── index.html          # Main entry point
└── docs/                   # Documentation
```

## Core Modules

### 1. Events (events.js)
- Manages betting events configuration
- Handles odds calculation and validation
- Provides event simulation logic
- Calculates risk scores

### 2. Personas (personas.js)
- Defines risk personas and their traits
- Manages persona transitions
- Provides persona-specific advice and commentary
- Validates bets against persona preferences

### 3. Game (game.js)
- Manages game state and logic
- Handles bet placement and outcomes
- Updates UI and manages transitions
- Tracks statistics and history

### 4. Animations (animations.js)
- Provides reusable animation utilities
- Manages visual feedback
- Handles transitions and effects
- Controls celebration animations

## Key Features

### Risk Management
- Dynamic risk calculation based on:
  - Bet size relative to balance (0-50 points)
  - Event probability (0-30 points)
  - Potential loss impact (0-20 points)

### Personas
Three distinct personas with unique traits:
1. Baby Betsy (0-30% risk)
   - Conservative betting
   - Prefers simple bets
   - Maximum 10% bankroll bets

2. Midlife Crisis Mike (31-70% risk)
   - Moderate risk-taking
   - Diverse betting strategy
   - Maximum 30% bankroll bets

3. YOLO Yolanda (71-100% risk)
   - Aggressive betting
   - High-risk preference
   - Will bet entire bankroll

### Betting Events
Four types of events with varying risk/reward:
1. Coin Flip (2.0x, 50% chance)
2. Dice Roll (6.0x, 16.6% chance)
3. Roulette (35.0x, 2.7% chance)
4. Sports Match (3.5x, 30% chance)

## State Management

The game state is managed through a central object:
```javascript
{
    balance: number,
    currentPersona: object,
    betHistory: array,
    highestBalance: number,
    lowestBalance: number,
    totalBets: number,
    wins: number,
    losses: number
}
```

## UI/UX Features

### Animations
- Money burst effects
- Persona transitions
- Risk meter updates
- Win/loss celebrations
- Toast notifications

### Responsive Design
- Mobile-first approach
- Fluid layouts
- Touch-friendly controls
- Accessible interface

## Adding New Features

### New Betting Events
1. Add event configuration to `events.js`
2. Update risk calculation if needed
3. Add any new UI elements
4. Test with all personas

### New Personas
1. Add persona configuration to `personas.js`
2. Define risk range and traits
3. Add commentary and tips
4. Test with all betting events

## Testing

Manual testing checklist:
1. Bet validation
2. Persona transitions
3. Risk calculation
4. Win/loss conditions
5. Animation triggers
6. Responsive layout
7. Error handling

## Performance Considerations

- Use CSS transforms for animations
- Limit DOM updates
- Optimize event listeners
- Manage memory usage in bet history

## Future Improvements

1. Add user accounts and persistence
2. Implement achievement system
3. Add more betting events
4. Create tutorial mode
5. Add sound effects
6. Implement multiplayer features
7. Add detailed statistics
8. Create leaderboards

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add documentation
5. Submit a pull request

## Code Style

- Use ES6+ features
- Follow modular design
- Comment complex logic
- Use meaningful variable names
- Keep functions focused and small

## License

MIT License - See LICENSE file for details 
