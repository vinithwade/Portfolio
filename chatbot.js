document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotBox = document.querySelector('.chatbot-box');
    const closeChat = document.querySelector('.close-chat');
    const sendMessage = document.querySelector('.send-message');
    const userInput = document.querySelector('#user-input');
    const chatMessages = document.querySelector('.chat-messages');

    // Toggle chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotBox.classList.add('active');
    });

    closeChat.addEventListener('click', () => {
        chatbotBox.classList.remove('active');
    });

    // Send message function
    function sendUserMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        addMessage('user', message);
        
        // Get bot response
        const response = getBotResponse(message);
        
        // Clear input
        userInput.value = '';
        
        // Add bot response with delay
        setTimeout(() => {
            addMessage('bot', response);
        }, 500);
    }

    // Add message to chat
    function addMessage(type, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        messageDiv.innerHTML = `
            <div class="message-content">
                ${message}
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Bot responses based on keywords
    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
            return "Vinith has experience as a Full Stack Developer, Machine Learning Engineer, and Software Engineering Intern. His most recent role involves developing scalable web applications.";
        }
        
        if (lowerMessage.includes('skills') || lowerMessage.includes('technologies')) {
            return "Vinith is skilled in React, Node.js, Python, AWS, Docker, and more. He has experience with both frontend and backend development.";
        }
        
        if (lowerMessage.includes('project') || lowerMessage.includes('portfolio')) {
            return "Vinith has worked on various projects including AI Image Generation, Code Assistant, Smart Home Hub, and more. Check out the Projects section for details!";
        }
        
        if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
            return "You can contact Vinith at wadevinith6@gmail.com or connect with him on LinkedIn!";
        }
        
        if (lowerMessage.includes('education') || lowerMessage.includes('study')) {
            return "Vinith has a strong educational background in Computer Science with focus on AI/ML and Web Development.";
        }

        return "I'm not sure about that. Try asking about Vinith's experience, skills, projects, or how to contact him!";
    }

    // Event listeners
    sendMessage.addEventListener('click', sendUserMessage);
    
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });
}); 