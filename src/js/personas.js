// Risk personas configuration and management
export const personas = [
    {
        id: "baby_betsy",
        name: "Baby Betsy",
        emoji: "👶🛡️",
        quote: "Safety first! Teddy-approved bets only 🧸",
        riskRange: { min: 0, max: 30 },
        traits: {
            maxBetPercent: 0.1, // Max 10% of bankroll
            preferredEvents: [1], // Prefers coin flips
            avoidedEvents: [3], // Avoids roulette
            recoveryStrategy: "conservative"
        },
        tips: [
            "Start small, grow steady!",
            "Always keep a safety cushion",
            "Stick to simple bets"
        ]
    },
    {
        id: "mike",
        name: "Midlife Crisis Mike",
        emoji: "🦸♂️💸",
        quote: "I'm either buying a yacht or going broke! ⚓",
        riskRange: { min: 31, max: 70 },
        traits: {
            maxBetPercent: 0.3, // Max 30% of bankroll
            preferredEvents: [2, 4], // Prefers dice and sports
            avoidedEvents: [],
            recoveryStrategy: "moderate"
        },
        tips: [
            "Diversify your bets",
            "Take calculated risks",
            "Know when to step back"
        ]
    },
    {
        id: "yolanda",
        name: "YOLO Yolanda",
        emoji: "🧨🤪",
        quote: "Retirement plan? I'm here for the THRILL! 🔥",
        riskRange: { min: 71, max: 100 },
        traits: {
            maxBetPercent: 1.0, // Will bet entire bankroll
            preferredEvents: [3], // Loves roulette
            avoidedEvents: [1], // Avoids "boring" coin flips
            recoveryStrategy: "aggressive"
        },
        tips: [
            "High risk, high reward!",
            "Fortune favors the bold!",
            "YOLO! (but maybe not everything?)"
        ]
    }
];

// Get persona based on risk score
export const getPersonaByRisk = (riskScore) => {
    return personas.find(persona => 
        riskScore >= persona.riskRange.min && 
        riskScore <= persona.riskRange.max
    );
};

// Get random tip from current persona
export const getPersonaTip = (persona) => {
    if (!persona || !persona.tips.length) return null;
    const randomIndex = Math.floor(Math.random() * persona.tips.length);
    return persona.tips[randomIndex];
};

// Check if bet aligns with persona traits
export const validatePersonaBet = (persona, betAmount, balance, eventId) => {
    if (!persona) return { valid: true };
    
    const betPercent = betAmount / balance;
    
    if (betPercent > persona.traits.maxBetPercent) {
        return {
            valid: false,
            message: `${persona.name} would never bet that much! (Max: ${persona.traits.maxBetPercent * 100}% of bankroll)`
        };
    }
    
    if (persona.traits.avoidedEvents.includes(eventId)) {
        return {
            valid: false,
            message: `${persona.name} avoids this type of bet!`
        };
    }
    
    return { valid: true };
};

// Get recovery strategy based on current persona
export const getRecoveryAdvice = (persona, lossAmount, balance) => {
    if (!persona) return null;
    
    const strategies = {
        conservative: {
            message: "Take a break and stick to small, safe bets to rebuild",
            maxBet: balance * 0.05
        },
        moderate: {
            message: "Try to recover with calculated medium-sized bets",
            maxBet: balance * 0.15
        },
        aggressive: {
            message: "Go big or go home! Time for a comeback!",
            maxBet: balance * 0.5
        }
    };
    
    return strategies[persona.traits.recoveryStrategy];
};

// Generate persona-specific commentary
export const getPersonaCommentary = (persona, outcome, betAmount, balance) => {
    if (!persona) return "";
    
    const comments = {
        baby_betsy: {
            win: ["Yay! My teddy bear brought good luck! 🧸✨", "Safe and sound profits! 👶💖"],
            loss: ["Ouchie! Time for my safety blanket 😢", "Maybe we should stick to piggy bank savings? 🐷"]
        },
        mike: {
            win: ["The yacht dream lives on! ⛵", "Take that, mid-life crisis! 💪"],
            loss: ["My wife's gonna kill me... 😅", "Still cheaper than a sports car! 🏎️"]
        },
        yolanda: {
            win: ["ABSOLUTE MADNESS! 🎉🔥", "WHO NEEDS A 401K ANYWAY?! 🚀"],
            loss: ["NO REGRETS! YOLO! 🤪", "Pain is temporary, GLORY IS FOREVER! 💥"]
        }
    };
    
    const personaComments = comments[persona.id];
    return outcome ? 
        personaComments.win[Math.floor(Math.random() * personaComments.win.length)] :
        personaComments.loss[Math.floor(Math.random() * personaComments.loss.length)];
}; 