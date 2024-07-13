const sendChatBtn = document.querySelector(".chat-input span");
const chatInput = document.querySelector(".chat-input textarea");
const chatBox= document.querySelector(".chatbox");

let userMessage;
const API_KEY = "sk-proj-rl03crmkMQIpUyz7ftSeT3BlbkFJwj2NYyJMilVj6vcJqU4j";

const createChatLi = (message,className) =>{
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent = className === 'outgoing' ? 
    `<p>${message}</p>` :
    `<span class="fa-solid fa-robot"></span>
    <p>${message}</p>`
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = () =>{
    const API_URL = "https://api.openai.com/v1/chat/completions"
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
        console.log(data);
    }).catch((error)=>{
        console.log(error);
    })
}

const handleChat = () =>{
    userMessage = chatInput.value;
    if(!userMessage) return;
    chatBox.append(createChatLi(userMessage,'outgoing'));
    setTimeout(()=>{
        chatBox.append(createChatLi('Thinking...','incoming'));
        generateResponse();
    },600);
}

sendChatBtn.onclick = () =>{
    handleChat();
} 