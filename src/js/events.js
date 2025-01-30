// Betting events configuration
export const events = [
    {
        id: 1,
        title: "Coin Flip",
        odds: 2.0,
        probability: 0.5,
        emoji: "🪙",
        description: "50/50 chance, double your money!",
        riskLevel: "Low",
        minBet: 10,
        maxBet: null, // null means no limit
        cooldown: 0 // in seconds
    },
    {
        id: 2,
        title: "Dice Roll",
        odds: 6.0,
        probability: 0.166,
        emoji: "🎲",
        description: "Roll a 6 to win big!",
        riskLevel: "Medium",
        minBet: 50,
        maxBet: 2000,
        cooldown: 2
    },
    {
        id: 3,
        title: "Roulette",
        odds: 35.0,
        probability: 0.027,
        emoji: "🎡",
        description: "Hit your lucky number!",
        riskLevel: "High",
        minBet: 100,
        maxBet: 1000,
        cooldown: 5
    },
    {
        id: 4,
        title: "Sports Match",
        odds: 3.5,
        probability: 0.3,
        emoji: "🏈",
        description: "Back the underdog!",
        riskLevel: "Medium",
        minBet: 25,
        maxBet: 5000,
        cooldown: 3
    }
];

// Helper functions for events
export const getEvent = (eventId) => events.find(event => event.id === eventId);

export const calculatePotentialWin = (eventId, betAmount) => {
    const event = getEvent(eventId);
    return event ? Math.floor(betAmount * event.odds) : 0;
};

export const validateBet = (eventId, betAmount) => {
    const event = getEvent(eventId);
    if (!event) return { valid: false, message: "Invalid event" };
    
    if (betAmount < event.minBet) {
        return { 
            valid: false, 
            message: `Minimum bet for ${event.title} is $${event.minBet}`
        };
    }
    
    if (event.maxBet && betAmount > event.maxBet) {
        return {
            valid: false,
            message: `Maximum bet for ${event.title} is $${event.maxBet}`
        };
    }
    
    return { valid: true };
};

export const simulateOutcome = (eventId) => {
    const event = getEvent(eventId);
    if (!event) return false;
    return Math.random() < event.probability;
};

// Risk calculation
export const calculateRiskScore = (eventId, betAmount, currentBalance) => {
    const event = getEvent(eventId);
    if (!event) return 0;
    
    // Risk factors:
    // 1. Bet size relative to balance (0-50 points)
    const betRatio = betAmount / currentBalance;
    const betSizeRisk = Math.min(betRatio * 100, 50);
    
    // 2. Event probability (0-30 points)
    const probabilityRisk = (1 - event.probability) * 30;
    
    // 3. Potential loss impact (0-20 points)
    const lossImpactRisk = Math.min((betAmount / currentBalance) * 40, 20);
    
    return Math.min(Math.round(betSizeRisk + probabilityRisk + lossImpactRisk), 100);
}; 