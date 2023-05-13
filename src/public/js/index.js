//FRONT

const socket = io();

socket.on("msg_back_to_front", (data)=>{
    console.log(JSON.stringify(data));
})