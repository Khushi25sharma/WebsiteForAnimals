console.log('Homepage loaded');

// Mobile menu functionality
const menuButton = document.querySelector('.md\\:hidden');
const navLinks = document.querySelector('.hidden.md\\:flex');

menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
    navLinks.classList.toggle('flex');
    navLinks.classList.toggle('flex-col');
    navLinks.classList.toggle('absolute');
    navLinks.classList.toggle('top-full');
    navLinks.classList.toggle('left-0');
    navLinks.classList.toggle('right-0');
    navLinks.classList.toggle('bg-white');
    navLinks.classList.toggle('p-4');
    navLinks.classList.toggle('shadow-lg');
});

document.querySelectorAll('.quick-link').forEach(link => {
  link.addEventListener('mouseenter', () => link.classList.add('scale-105'));
  link.addEventListener('mouseleave', () => link.classList.remove('scale-105'));
});

// Did You Know? Facts Carousel
const facts = [
    {
        icon: 'fa-chocolate',
        title: 'Chocolate is Toxic to Dogs',
        text: 'Even small amounts of chocolate can be dangerous for dogs. Keep all chocolate products out of reach!'
    },
    {
        icon: 'fa-cat',
        title: 'White Cats with Blue Eyes',
        text: 'White cats with blue eyes are often deaf due to a genetic link between coat color and hearing.'
    },
    {
        icon: 'fa-dog',
        title: 'Dogs Can Detect Emotions',
        text: 'Dogs can read human emotions through facial expressions and body language.'
    },
    {
        icon: 'fa-heart',
        title: 'Cats Purr for Healing',
        text: 'A cat\'s purr can be a form of self-healing, with frequencies between 25-150 Hz promoting bone and tissue repair.'
    },
    {
        icon: 'fa-bone',
        title: 'Dogs\' Sense of Smell',
        text: 'A dog\'s sense of smell is about 40 times greater than a human\'s, with some breeds having up to 300 million scent receptors!'
    },
    {
        icon: 'fa-clock',
        title: 'Cat Sleep Patterns',
        text: 'Cats sleep for 12-16 hours a day, conserving energy for hunting. They\'re most active during dawn and dusk.'
    },
    {
        icon: 'fa-temperature-high',
        title: 'Pet Temperature',
        text: 'A dog\'s normal body temperature is 101-102.5°F (38.3-39.2°C), higher than humans\' 98.6°F (37°C).'
    },
    {
        icon: 'fa-heartbeat',
        title: 'Pet Heart Rates',
        text: 'A cat\'s heart beats 140-220 times per minute, while a dog\'s is 60-140 bpm. Compare that to humans\' 60-100 bpm!'
    },
    {
        icon: 'fa-brain',
        title: 'Pet Intelligence',
        text: 'Dogs can understand up to 250 words and gestures, while cats can recognize their names and basic commands.'
    },
    {
        icon: 'fa-paw',
        title: 'Unique Paw Prints',
        text: 'Just like human fingerprints, each cat and dog has a unique nose print that can be used for identification.'
    }
];

let currentFactIndex = 0;
const factSlide = document.querySelector('.fact-slide');
const factNavs = document.querySelectorAll('.fact-nav');

function updateFact() {
    const fact = facts[currentFactIndex];
    factSlide.innerHTML = `
        <div class="text-4xl text-primary-dark mb-4"><i class="fas ${fact.icon}"></i></div>
        <h3 class="text-2xl font-bold text-primary-dark mb-4">${fact.title}</h3>
        <p class="text-gray-700">${fact.text}</p>
    `;
    
    // Add fade animation
    factSlide.style.opacity = '0';
    setTimeout(() => {
        factSlide.style.transition = 'opacity 0.5s ease-in-out';
        factSlide.style.opacity = '1';
    }, 50);
}

factNavs[0].addEventListener('click', () => {
    currentFactIndex = (currentFactIndex - 1 + facts.length) % facts.length;
    updateFact();
});

factNavs[1].addEventListener('click', () => {
    currentFactIndex = (currentFactIndex + 1) % facts.length;
    updateFact();
});

// Auto-rotate facts every 5 seconds
let factInterval = setInterval(() => {
    currentFactIndex = (currentFactIndex + 1) % facts.length;
    updateFact();
}, 5000);

// Pause auto-rotation when hovering over facts
factSlide.addEventListener('mouseenter', () => clearInterval(factInterval));
factSlide.addEventListener('mouseleave', () => {
    factInterval = setInterval(() => {
        currentFactIndex = (currentFactIndex + 1) % facts.length;
        updateFact();
    }, 5000);
});

// Initialize first fact
updateFact();

// Enhanced Chat Functionality
class ChatWindow {
    constructor(title, initialMessage) {
        this.title = title;
        this.initialMessage = initialMessage;
        this.messages = [];
        this.window = null;
    }

    create() {
        this.window = document.createElement('div');
        this.window.className = 'fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-xl z-50 overflow-hidden';
        this.window.innerHTML = `
            <div class="bg-primary p-4 text-white">
                <div class="flex justify-between items-center">
                    <h3 class="font-bold">${this.title}</h3>
                    <button class="text-white hover:text-gray-200">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="p-4 h-80 overflow-y-auto chat-messages">
                <div class="mb-4">
                    <div class="bg-gray-100 rounded-lg p-3 inline-block">
                        <p class="text-sm">${this.initialMessage}</p>
                    </div>
                </div>
            </div>
            <div class="p-4 border-t">
                <div class="flex gap-2">
                    <input type="text" placeholder="Type your message..." class="flex-1 form-input chat-input">
                    <button class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition send-button">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(this.window);
        this.setupEventListeners();
        this.animateIn();
    }

    setupEventListeners() {
        const closeButton = this.window.querySelector('.bg-primary button');
        const input = this.window.querySelector('.chat-input');
        const sendButton = this.window.querySelector('.send-button');
        const messagesContainer = this.window.querySelector('.chat-messages');

        closeButton.addEventListener('click', () => this.close());

        const sendMessage = () => {
            const message = input.value.trim();
            if (message) {
                this.addMessage(message, 'user');
                input.value = '';
                this.autoReply();
            }
        };

        sendButton.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    addMessage(text, sender) {
        const messagesContainer = this.window.querySelector('.chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `mb-4 ${sender === 'user' ? 'text-right' : ''}`;
        messageDiv.innerHTML = `
            <div class="${sender === 'user' ? 'bg-primary text-white' : 'bg-gray-100'} rounded-lg p-3 inline-block">
                <p class="text-sm">${text}</p>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    autoReply() {
        const replies = [
            "I understand your concern. Let me help you with that.",
            "That's a great question! Here's what you need to know...",
            "I'm here to help. Could you tell me more about your situation?",
            "Thank you for reaching out. Let me provide you with some information.",
            "I'm glad you asked. Here's what we recommend..."
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        setTimeout(() => this.addMessage(randomReply, 'bot'), 1000);
    }

    animateIn() {
        this.window.style.transform = 'translateY(20px)';
        this.window.style.opacity = '0';
        requestAnimationFrame(() => {
            this.window.style.transition = 'all 0.3s ease-out';
            this.window.style.transform = 'translateY(0)';
            this.window.style.opacity = '1';
        });
    }

    close() {
        this.window.style.transform = 'translateY(20px)';
        this.window.style.opacity = '0';
        setTimeout(() => this.window.remove(), 300);
    }
}

// Vet Chat Functionality
document.querySelectorAll('.text-primary-dark.hover\\:text-primary.font-bold').forEach(button => {
    button.addEventListener('click', () => {
        const vetName = button.textContent.split(' ')[2];
        const chat = new ChatWindow(
            `Chat with ${vetName}`,
            `👋 Hi! I'm Dr. ${vetName}. How can I help you today?`
        );
        chat.create();
    });
});

// Live Chat Functionality
const chatButton = document.querySelector('.fixed.bottom-6.right-6 button');
let mainChat = null;

chatButton.addEventListener('click', () => {
    if (mainChat) {
        mainChat.close();
        mainChat = null;
        return;
    }

    mainChat = new ChatWindow(
        'Chat with Us',
        '👋 Hi! How can we help you today?'
    );
    mainChat.create();
}); 