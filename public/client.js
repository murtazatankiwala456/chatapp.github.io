const socket= io();


let user;

let textarea=document.querySelector('#textarea');
let messageArea=document.querySelector('.message_area')

do{

   user = prompt('Enter your name:')

}while(!user)

textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }

})


function sendMessage(message){
    let msg={
        name:user,
        message: message.trim()
    }
    //Append
    appendMessage(msg,'outgoing');


    textarea.value='';
    scrollToBottom();

    // send to server
    socket.emit('message', msg)

}

function appendMessage(msg,type){
    let mainDiv=document.createElement('div')
    let className=type
    mainDiv.classList.add(className,'message')


    let markUp=` <h4>${msg.name}</h4>
                 <p>${msg.message}</p> `

                 mainDiv.innerHTML=markUp;

                 messageArea.append(mainDiv)
}


// Recieve mesage

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()

});


function scrollToBottom(){
    messageArea.scrollTop =messageArea.scrollHeight
}