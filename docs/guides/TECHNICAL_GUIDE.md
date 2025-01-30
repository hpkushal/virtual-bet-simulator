# Virtual Bet Simulator - Technical Guide 🔧

This guide provides detailed technical information about the simulator's implementation, formulas, and architecture.

## Core Systems 🎯

### 1. Risk Assessment System

#### Risk Score Calculation
```javascript
const riskScore = betSizeRisk + probabilityRisk + lossImpactRisk;

where:
betSizeRisk = min((betAmount / balance) * 100, 50)
probabilityRisk = (1 - eventProbability) * 30
lossImpactRisk = min((betAmount / balance) * 40, 20)
```

#### Risk Level Thresholds
```javascript
const riskLevels = {
    low: { min: 0, max: 30 },
    medium: { min: 31, max: 70 },
    high: { min: 71, max: 100 }
};
```

### 2. Betting Events System

#### Event Configuration
```javascript
{
    id: number,
    title: string,
    odds: number,
    probability: number,
    emoji: string,
    description: string,
    riskLevel: string,
    minBet: number,
    maxBet: number | null,
    cooldown: number
}
```

#### Outcome Simulation
```javascript
const simulateOutcome = (probability) => Math.random() < probability;
```

### 3. Persona System

#### Persona State
```javascript
{
    id: string,
    name: string,
    emoji: string,
    quote: string,
    riskRange: { min: number, max: number },
    traits: {
        maxBetPercent: number,
        preferredEvents: number[],
        avoidedEvents: number[],
        recoveryStrategy: string
    }
}
```

#### Persona Selection
```javascript
const getPersona = (riskScore) => 
    personas.find(p => 
        riskScore >= p.riskRange.min && 
        riskScore <= p.riskRange.max
    );
```

## Animation System 🎨

### 1. Money Animations
```css
@keyframes money-burst {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.8; }
    100% { transform: scale(1); opacity: 1; }
}
```

### 2. Persona Transitions
```css
@keyframes persona-pop {
    0% { transform: translateY(10px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
}
```

### 3. Risk Meter Updates
```css
.risk-gradient {
    background: linear-gradient(
        90deg,
        #4ade80 0%,    /* Green */
        #f59e0b 50%,   /* Yellow */
        #ef4444 100%   /* Red */
    );
}
```

## State Management 📊

### Game State Interface
```typescript
interface GameState {
    balance: number;
    currentPersona: Persona | null;
    betHistory: BetRecord[];
    highestBalance: number;
    lowestBalance: number;
    totalBets: number;
    wins: number;
    losses: number;
}
```

### Bet History Record
```typescript
interface BetRecord {
    event: string;
    betAmount: number;
    outcome: boolean;
    winAmount: number;
    balance: number;
    timestamp: Date;
}
```

## Event Handling System 🎮

### 1. Bet Validation
```javascript
const validateBet = (amount, event, balance) => {
    if (amount < event.minBet) return false;
    if (event.maxBet && amount > event.maxBet) return false;
    if (amount > balance) return false;
    return true;
};
```

### 2. Persona Validation
```javascript
const validatePersonaBet = (amount, balance, persona) => {
    const betPercent = amount / balance;
    return betPercent <= persona.traits.maxBetPercent;
};
```

## UI Components 🖼️

### 1. Risk Meter Component
```javascript
const updateRiskMeter = (percentage) => {
    const meter = document.getElementById('riskMeter');
    meter.style.width = `${percentage}%`;
    meter.className = `risk-meter ${getRiskClass(percentage)}`;
};
```

### 2. Toast Notifications
```javascript
const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
};
```

## Performance Optimizations 🚀

### 1. DOM Updates
- Batch updates using `requestAnimationFrame`
- Use document fragments for multiple insertions
- Limit history log to 50 entries

### 2. Animation Performance
- Use CSS transforms instead of position/dimensions
- Hardware acceleration with `transform3d`
- Debounce rapid animations

### 3. Event Handling
- Delegate event listeners where possible
- Debounce rapid input events
- Clean up listeners on reset

## Browser Compatibility 🌐

### Minimum Requirements
- Chrome 80+
- Firefox 75+
- Safari 13.1+
- Edge 80+

### Feature Detection
```javascript
const supportsModules = 'noModule' in HTMLScriptElement.prototype;
const supportsAnimations = 'animate' in HTMLElement.prototype;
```

## Security Considerations 🔒

### 1. Input Validation
- Sanitize all user inputs
- Validate bet amounts
- Prevent negative values

### 2. State Protection
- No direct state manipulation
- Validate all state changes
- Protect against NaN/undefined

## Error Handling 🚨

### 1. Bet Errors
```javascript
try {
    const result = placeBet(amount, event);
    if (!result.success) {
        handleBetError(result.error);
    }
} catch (error) {
    logError('Bet placement failed', error);
}
```

### 2. Recovery Strategies
```javascript
const recoverFromError = (error) => {
    switch (error.type) {
        case 'INVALID_BET':
            resetBetInput();
            break;
        case 'STATE_ERROR':
            resetGameState();
            break;
        default:
            showErrorMessage(error);
    }
};
```

## Testing Guidelines 🧪

### 1. Unit Tests
- Test all calculation functions
- Validate risk assessment
- Check persona transitions

### 2. Integration Tests
- Test bet flow end-to-end
- Verify state updates
- Check UI responses

### 3. Performance Tests
- Monitor animation frame rate
- Check memory usage
- Test with rapid interactions

## Deployment 📦

### 1. Build Process
- Minify JavaScript
- Optimize images
- Generate source maps

### 2. CDN Setup
- Use Tailwind CDN
- Cache static assets
- Set proper CORS headers

## Monitoring 📈

### 1. Analytics
- Track bet patterns
- Monitor win/loss ratios
- Record persona changes

### 2. Error Tracking
- Log all errors
- Track performance issues
- Monitor user interactions

## Future Improvements 🔮

1. Add local storage persistence
2. Implement achievement system
3. Add sound effects
4. Create multiplayer mode
5. Add detailed statistics
6. Implement leaderboards

This technical guide should help developers understand the system architecture and implement new features effectively.
