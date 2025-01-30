// Animation utilities for Risk & Reward Simulator

// Confetti animation for big wins
export const createConfetti = () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'celebration-confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDelay = `${Math.random() * 3}s`;
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => confetti.remove(), 3000);
    }
};

// Money burst animation
export const animateMoneyBurst = (element) => {
    element.classList.add('money-animation');
    setTimeout(() => element.classList.remove('money-animation'), 500);
};

// Persona transition animation
export const animatePersonaChange = (element, newPersona) => {
    element.classList.add('persona-pop');
    setTimeout(() => {
        element.textContent = newPersona.emoji;
        setTimeout(() => element.classList.remove('persona-pop'), 300);
    }, 150);
};

// Risk meter animation
export const animateRiskMeter = (element, riskPercentage) => {
    element.style.width = `${riskPercentage}%`;
    
    // Add pulse animation for high risk
    if (riskPercentage > 70) {
        element.classList.add('risk-pulse');
    } else {
        element.classList.remove('risk-pulse');
    }
};

// Toast notification
export const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type} smooth-transition`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Slide in
    setTimeout(() => toast.style.transform = 'translateX(0)', 100);
    
    // Remove after delay
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// Win celebration animation
export const celebrateWin = (amount) => {
    createConfetti();
    
    const celebration = document.createElement('div');
    celebration.className = 'win-celebration text-4xl font-bold text-center';
    celebration.textContent = `+$${amount}! 🎉`;
    celebration.style.position = 'fixed';
    celebration.style.top = '50%';
    celebration.style.left = '50%';
    celebration.style.transform = 'translate(-50%, -50%)';
    
    document.body.appendChild(celebration);
    setTimeout(() => celebration.remove(), 2000);
};

// Loss animation
export const animateLoss = (amount) => {
    const loss = document.createElement('div');
    loss.className = 'text-red-500 text-2xl font-bold text-center smooth-transition';
    loss.textContent = `-$${amount} 😢`;
    loss.style.position = 'fixed';
    loss.style.top = '50%';
    loss.style.left = '50%';
    loss.style.transform = 'translate(-50%, -50%)';
    
    document.body.appendChild(loss);
    setTimeout(() => {
        loss.style.opacity = '0';
        setTimeout(() => loss.remove(), 300);
    }, 1700);
};

// Button click animation
export const animateButtonClick = (button) => {
    button.classList.add('scale-95', 'opacity-90');
    setTimeout(() => {
        button.classList.remove('scale-95', 'opacity-90');
    }, 150);
};

// Shake animation for invalid actions
export const shakeElement = (element) => {
    element.classList.add('animate-shake');
    setTimeout(() => element.classList.remove('animate-shake'), 500);
};

// Add tailwind animation class
const shakeyKeyframes = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}
.animate-shake {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}
`;

// Add shake animation styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = shakeyKeyframes;
document.head.appendChild(styleSheet); 