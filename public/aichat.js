const promptInput = document.getElementById('prompt');
const chat = document.getElementById('chat');

let typingIndicator = null;
let typingBubble = null;

function createTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.style.display = 'flex';
    typingIndicator.style.justifyContent = 'center';
    typingIndicator.style.alignItems = 'center';
    typingIndicator.style.gap = '5px';
    typingIndicator.style.padding = '10px';

    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        dot.style.width = '8px';
        dot.style.height = '8px';
        dot.style.backgroundColor = 'white';
        dot.style.borderRadius = '50%';
        dot.style.animation = 'bounce 1.2s infinite ease-in-out';
        dot.style.animationDelay = `${i * 0.2}s`;
        typingIndicator.appendChild(dot);
    }
    return typingIndicator;
}

function showTypingIndicator() {
    typingBubble = document.createElement('div');
    typingBubble.classList.add('bubble', 'left');
    typingBubble.id = 'dots';
    typingBubble.classList.add('typing');
    typingIndicator = createTypingIndicator();
    typingBubble.appendChild(typingIndicator);
    typingBubble.style.display = 'flex';
    typingIndicator.style.display = 'flex';

    if (!chat.contains(typingBubble)) {
        chat.appendChild(typingBubble);
        chat.scrollTop = chat.scrollHeight;
    }
}

function hideTypingIndicator() {
    if (typingBubble && chat.contains(typingBubble)) {
        chat.removeChild(typingBubble);
    }
    typingIndicator = null;
    typingBubble = null;
}

function appendUserBubble(text) {
    const bubbleRight = document.createElement('div');
    bubbleRight.classList.add('bubble', 'right');
    bubbleRight.textContent = text;
    chat.appendChild(bubbleRight);

    const rightBubbles = chat.querySelectorAll('.bubble.right');
    if (rightBubbles.length === 1) {
        bubbleRight.style.marginTop = 'auto';
    }

    chat.scrollTop = chat.scrollHeight;
}

function appendBotBubble(text) {
    const bubbleLeft = document.createElement('div');
    bubbleLeft.classList.add('bubble', 'left');
    bubbleLeft.textContent = text;
    chat.appendChild(bubbleLeft);

    chat.scrollTop = chat.scrollHeight;
}

async function send() {
    const prompt = promptInput.value.trim();
    if (!prompt) return;

    promptInput.disabled = true;
    appendUserBubble(prompt);
    promptInput.value = '';

    showTypingIndicator();

    try {
        const res = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: prompt })
        });

        const data = await res.json();
        hideTypingIndicator();
        appendBotBubble(data.reply || '[No response]');
    } catch (error) {
        hideTypingIndicator();
        appendBotBubble('Error receiving response.');
        console.error(error);
    } finally {
        promptInput.disabled = false;
        promptInput.focus();
    }
}

// Optional: bind send() to Enter key
promptInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        send();
    }
});

// Typing animation style
const style = document.createElement('style');
style.textContent = `
@keyframes bounce {
    0%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
}
`;
document.head.appendChild(style);
