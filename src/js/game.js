// Import required modules
import { events, getEvent, calculatePotentialWin, validateBet, simulateOutcome, calculateRiskScore } from './events.js';
import { getPersonaByRisk, getPersonaTip, validatePersonaBet, getRecoveryAdvice, getPersonaCommentary } from './personas.js';
import * as animations from './animations.js';

// Game state
let gameState = {
    balance: 1000,
    currentPersona: null,
    betHistory: [],
    highestBalance: 1000,
    lowestBalance: 1000,
    totalBets: 0,
    wins: 0,
    losses: 0
};

// Initialize game
export const initGame = () => {
    updateBalance(1000);
    initEventListeners();
    updateRiskMeter(0);
    updatePersona(getPersonaByRisk(0));
    renderEvents();
};

// Update balance
export const updateBalance = (newBalance) => {
    gameState.balance = newBalance;
    gameState.highestBalance = Math.max(gameState.highestBalance, newBalance);
    gameState.lowestBalance = Math.min(gameState.lowestBalance, newBalance);
    
    const balanceElement = document.getElementById('balance');
    balanceElement.textContent = `$${newBalance}`;
    animations.animateMoneyBurst(balanceElement);
    
    // Check for win condition
    if (newBalance >= 10000) {
        handleWinCondition();
    } else if (newBalance <= 0) {
        handleGameOver();
    }
};

// Place bet
export const placeBet = async (eventId, betAmount) => {
    const event = getEvent(eventId);
    if (!event) return;
    
    // Validate bet
    const betValidation = validateBet(eventId, betAmount);
    if (!betValidation.valid) {
        animations.showToast(betValidation.message, 'error');
        animations.shakeElement(document.getElementById('betAmount'));
        return;
    }
    
    // Validate against persona
    const personaValidation = validatePersonaBet(gameState.currentPersona, betAmount, gameState.balance, eventId);
    if (!personaValidation.valid) {
        animations.showToast(personaValidation.message, 'warning');
        return;
    }
    
    // Calculate risk and update meter
    const riskScore = calculateRiskScore(eventId, betAmount, gameState.balance);
    updateRiskMeter(riskScore);
    
    // Process bet
    const outcome = simulateOutcome(eventId);
    const winAmount = outcome ? calculatePotentialWin(eventId, betAmount) : 0;
    const newBalance = gameState.balance - betAmount + winAmount;
    
    // Update game state
    gameState.totalBets++;
    outcome ? gameState.wins++ : gameState.losses++;
    
    // Add to history
    addToHistory({
        event: event.title,
        betAmount,
        outcome,
        winAmount,
        balance: newBalance,
        timestamp: new Date()
    });
    
    // Animate outcome
    if (outcome) {
        animations.celebrateWin(winAmount);
        animations.showToast(getPersonaCommentary(gameState.currentPersona, true), 'success');
    } else {
        animations.animateLoss(betAmount);
        animations.showToast(getPersonaCommentary(gameState.currentPersona, false), 'error');
        
        // Show recovery advice if significant loss
        if (betAmount > gameState.balance * 0.2) {
            const advice = getRecoveryAdvice(gameState.currentPersona, betAmount, newBalance);
            if (advice) {
                setTimeout(() => animations.showToast(advice.message, 'info'), 2000);
            }
        }
    }
    
    // Update balance
    updateBalance(newBalance);
    
    // Update persona based on new risk level
    updatePersona(getPersonaByRisk(riskScore));
};

// Update risk meter
const updateRiskMeter = (riskScore) => {
    const meterElement = document.getElementById('riskMeter');
    const percentageElement = document.getElementById('riskPercentage');
    
    animations.animateRiskMeter(meterElement, riskScore);
    percentageElement.textContent = `${riskScore}% Risk`;
};

// Update persona
const updatePersona = (newPersona) => {
    if (!newPersona || newPersona.id === gameState.currentPersona?.id) return;
    
    gameState.currentPersona = newPersona;
    
    const emojiElement = document.getElementById('personaEmoji');
    const nameElement = document.getElementById('personaName');
    const quoteElement = document.getElementById('personaQuote');
    
    animations.animatePersonaChange(emojiElement, newPersona);
    nameElement.textContent = newPersona.name;
    quoteElement.textContent = newPersona.quote;
    
    // Show random tip
    const tip = getPersonaTip(newPersona);
    if (tip) {
        setTimeout(() => animations.showToast(tip, 'info'), 1000);
    }
};

// Add bet to history
const addToHistory = (bet) => {
    gameState.betHistory.unshift(bet);
    
    const logElement = document.getElementById('actionLog');
    const entry = document.createElement('div');
    entry.className = 'text-sm p-2 bg-gray-700 rounded';
    entry.textContent = `${bet.outcome ? '✅' : '❌'} ${bet.event}: ${bet.outcome ? '+' : '-'}$${bet.outcome ? bet.winAmount : bet.betAmount}`;
    
    logElement.insertBefore(entry, logElement.firstChild);
    
    // Keep only last 50 entries
    if (gameState.betHistory.length > 50) {
        gameState.betHistory.pop();
        if (logElement.children.length > 50) {
            logElement.removeChild(logElement.lastChild);
        }
    }
};

// Handle win condition
const handleWinCondition = () => {
    const stats = calculateStats();
    const message = `
        🎉 CONGRATULATIONS! You've reached $10,000! 🎉
        Total Bets: ${stats.totalBets}
        Win Rate: ${stats.winRate}%
        Biggest Win: $${stats.biggestWin}
        Time: ${stats.timePlayed}
    `;
    
    animations.showToast(message, 'success');
    document.getElementById('shareModal').classList.remove('hidden');
};

// Handle game over
const handleGameOver = () => {
    const stats = calculateStats();
    const message = `
        Game Over! 💸
        Final Balance: $${gameState.balance}
        Highest Balance: $${gameState.highestBalance}
        Total Bets: ${stats.totalBets}
        Win Rate: ${stats.winRate}%
    `;
    
    animations.showToast(message, 'error');
};

// Calculate game statistics
const calculateStats = () => {
    return {
        totalBets: gameState.totalBets,
        winRate: Math.round((gameState.wins / gameState.totalBets) * 100) || 0,
        biggestWin: Math.max(...gameState.betHistory
            .filter(bet => bet.outcome)
            .map(bet => bet.winAmount)) || 0,
        timePlayed: '00:00' // TODO: Implement timer
    };
};

// Initialize event listeners
const initEventListeners = () => {
    // Quick bet buttons
    document.querySelectorAll('.chip').forEach(btn => {
        btn.addEventListener('click', () => {
            animations.animateButtonClick(btn);
        });
    });
    
    // Bet amount input validation
    const betInput = document.getElementById('betAmount');
    betInput.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        if (value > gameState.balance) {
            e.target.value = gameState.balance;
            animations.shakeElement(betInput);
            animations.showToast("Can't bet more than your balance!", 'warning');
        }
    });
};

// Render betting events
const renderEvents = () => {
    const container = document.getElementById('events');
    container.innerHTML = '';
    
    events.forEach(event => {
        const button = document.createElement('button');
        button.className = 'event-button p-4 rounded-xl transition-all relative overflow-hidden';
        button.innerHTML = `
            <div class="text-3xl mb-2">${event.emoji}</div>
            <div class="font-bold text-lg">${event.title}</div>
            <div class="odds-badge absolute top-2 right-2 bg-black/20 px-2 py-1 rounded-md text-sm">
                ${event.odds.toFixed(1)}x
            </div>
        `;
        
        button.addEventListener('click', () => {
            const betAmount = parseInt(document.getElementById('betAmount').value);
            if (!betAmount || betAmount < 1) {
                animations.showToast('Please enter a valid bet amount!', 'error');
                return;
            }
            placeBet(event.id, betAmount);
        });
        
        container.appendChild(button);
    });
}; 