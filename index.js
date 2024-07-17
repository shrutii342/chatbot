const sendChatBtn = document.querySelector(".chat-input span");
const chatInput = document.querySelector(".chat-input textarea");
const chatBox = document.querySelector(".chatbox");
const chatBotToggler = document.querySelector(".chatbot-toggler");
const chatBotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const API_KEY = "sk-proj-rl03crmkMQIpUyz7ftSeT3BlbkFJwj2NYyJMilVj6vcJqU4j";
const inputHeight = chatInput.computedStyleMap.scrollHeight;

const createChatLi = (message,className) =>{
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent = className === 'outgoing' ? 
    `<p>$</p>` :
    `
    <span class="fa-solid fa-robot"></span>
    <p>$</p>
    `
    chatLi.querySelector("p").textContent = message;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = (incomingChatLi) =>{
    const API_URL = "https://api.openai.com/v1/chat/completions"
    const messageElement = incomingChatLi.querySelector("p");
    const requestOption = {
        method : "post",
        header : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${API_KEY}`
        },
        body : JSON.stringify({
            "model": "gpt-3.5-turbo-1106",
            "messages": [
                {
                    "role": "user",
                    "content": userMessage
                },
            ]
        })
    }
    fetch(API_URL,requestOption)
    .then((res=>res.json()))
    .then((data)=>{
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error)=>{
        messageElement.classList.add("error");
        messageElement.textContent = "Oops ! Something went wrong. Please try again." ;
    }).finally(()=>{
        chatBox.scrollTo(0,chatBox.scrollHeight);
    })
}

const handleChat = () =>{
    userMessage = chatInput.value;
    if(!userMessage) return;
    chatInput.value = "";
    chatBox.append(createChatLi(userMessage,'outgoing'));
    chatBox.scrollTo(0,chatBox.scrollHeight);
    setTimeout(()=>{
        const incomingChatLi = createChatLi('Thinking...','incoming');
        chatBox.append(incomingChatLi);
        chatBox.scrollTo(0,chatBox.scrollHeight);
        generateResponse(incomingChatLi);
    },600);
}

sendChatBtn.onclick = () =>{
    handleChat();
} 

chatBotToggler.onclick = () =>{
    document.body.classList.toggle("show-chatbot");
}
chatBotCloseBtn.onclick = () =>{
    document.body.classList.remove("show-chatbot");
}
chatInput.oninput = () =>{
    chatInput.style.height = `${inputHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
}
chatInput.onkeydown = () =>{
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800);
        {
            e.preventDefault();
            handleChat();
        }
}
