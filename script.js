let counter = 0;

function showAlert() {
    alert('Дякую за інтерес! 🚀\n\nЗв\'яжіться зі мною:\n📧 your.email@example.com');
}

function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

function cardClick(event, card) {
    card.style.background = 'rgba(255, 255, 255, 0.25)';
    setTimeout(() => { card.style.background = 'rgba(255, 255, 255, 0.15)'; }, 200);
    createParticles(event.clientX, event.clientY);
}

function incrementCounter() {
    counter++;
    const counterEl = document.getElementById('counter');
    counterEl.textContent = counter;
    counterEl.style.animation = 'none';
    setTimeout(() => { counterEl.style.animation = 'fadeIn 0.3s ease'; }, 10);
}

function resetCounter() {
    counter = 0;
    document.getElementById('counter').textContent = counter;
}

async function sendMessage() {
    const input = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const message = input.value.trim();
    if (!message) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'message user-message';
    userMsg.textContent = message;
    chatBox.appendChild(userMsg);

    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    const thinkingMsg = document.createElement('div');
    thinkingMsg.className = 'message ai-message';
    thinkingMsg.textContent = '⏳ Думаю...';
    chatBox.appendChild(thinkingMsg);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1000,
                messages: [{ role: 'user', content: `Ти дружній AI асистент на веб-сайті. Відповідай коротко та дружньо українською мовою. Питання: ${message}` }]
            })
        });
        const data = await response.json();
        thinkingMsg.remove();

        const aiMsg = document.createElement('div');
        aiMsg.className = 'message ai-message';
        aiMsg.textContent = data.content[0]?.text || 'Вибач, щось пішло не так 😅';
        chatBox.appendChild(aiMsg);
    } catch (error) {
        thinkingMsg.textContent = '❌ Помилка з\'єднання. Спробуй ще раз!';
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

function createParticles(x, y) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.animationDelay = (i * 0.1) + 's';
        document.body.appendChild(particle);
        setTimeout(() => { particle.remove(); }, 3000);
    }
}

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) createParticles(e.clientX, e.clientY);
});