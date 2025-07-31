async function send() {
    const prompt = document.getElementById('prompt').value;
    const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    document.getElementById('response').innerText = data.reply;
}
const chat = document.getElementById('chat');
function rec() {
    const bubbleLeft = document.createElement('div');
    bubbleLeft.classList.add('bubble', 'left');
    bubbleLeft.textContent = 'rec';
    chat.appendChild(bubbleLeft);

}

function sent() {
    const bubbleRight = document.createElement('div');
    bubbleRight.classList.add('bubble', 'right');
    bubbleRight.textContent = 'sent';
    chat.appendChild(bubbleRight);
}