const promptInput = document.getElementById('prompt');

async function send() {

    promptInput.disabled = true;

    const prompt = promptInput.value;
    const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    document.getElementById('response').innerText = data.reply;

    promptInput.disabled = false;
    promptInput.value = '';
}


const chat = document.getElementById('chat');

function rec() {
    const bubbleLeft = document.createElement('div');
    bubbleLeft.classList.add('bubble', 'left');
    bubbleLeft.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, nostrum totam. Reiciendis nemo at soluta quod quam veritatis totam ex sint. Delectus eum explicabo enim minus deserunt perspiciatis nam rerum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, nostrum totam. Reiciendis nemo at soluta quod quam veritatis totam ex sint. Delectus eum explicabo enim minus deserunt perspiciatis nam rerum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, nostrum totam. Reiciendis nemo at soluta quod quam veritatis totam ex sint. Delectus eum explicabo enim minus deserunt perspiciatis nam rerum!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore molestiae praesentium ipsum nam quia ducimus quisquam, error assumenda tempora porro fugiat labore ipsam obcaecati magni eveniet similique possimus. Sint, eveniet.';
    chat.appendChild(bubbleLeft);

}

function sent() {
    const bubbleRight = document.createElement('div');
    bubbleRight.classList.add('bubble', 'right');
    bubbleRight.textContent = 'sent';
    chat.appendChild(bubbleRight);

    // Check if this is the first .bubble.right
    const rightBubbles = chat.querySelectorAll('.bubble.right');
    if (rightBubbles.length === 1) {
        bubbleRight.style.marginTop = 'auto';
    }
}


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

let typingIndicator = null;

function showTypingIndicator() {
    // If the typing bubble doesn't exist, create it

    typingBubble = document.createElement('div');
    typingBubble.classList.add('bubble', 'right');
    typingBubble.id = 'dots';
    typingBubble.classList.add('typing'); // Add 'typing' class for identification
    typingIndicator = createTypingIndicator();
    typingBubble.appendChild(typingIndicator);


    // Ensure the typing bubble is visible
    typingBubble.style.display = 'flex';
    typingIndicator.style.display = 'flex';

    // Only append the typing bubble if it hasn't been added yet
    if (!chat.contains(typingBubble)) {
        chat.appendChild(typingBubble); // Append the typing indicator to the correct place
    }
}

const style = document.createElement('style');
style.textContent = `
  	@keyframes bounce {
		0%, 80%, 100% {
			transform: translateY(0); /* Dots at original position */
		}
		40% {
			transform: translateY(-10px); /* Dots move up */
		}
    }
    `
document.head.appendChild(style);
