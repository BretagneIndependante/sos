import Card from "components/card";
import axios from 'axios';
import React, {useRef, useState} from 'react';

const Chat = () => {
    const token = document.cookie.split(";").find(element => element.includes("token")).split("=")[1];
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const input = useRef(null);
    const div = useRef(null);
    const ticketUID = window.location.pathname.split("/")[2]; 

    axios.get("http://localhost:3001/API/v1/chat/get?token=" + token + "&ticket_uuid=" + ticketUID)
    .then((response) => { setMessages(response.data) });

    function handleClick() {
      if (input.current.value === "") return;
      axios.post("http://localhost:3001/API/v1/chat/send?message=" + input.current.value + "&token=" + token + "&ticket_uuid=" + ticketUID)
      //setMessages(prevMessages => [...prevMessages, {text:input.current.value, is_sender: true}]);
      setInputValue("");
      div.current.scrollTop = div.current.scrollHeight - div.current.clientHeight;
    }

    return (
      <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
        <div className="mb-2 flex items-center justify-between px-6">
          <h2 className="text-lg font-bold text-navy-700 dark:text-white">
              Chat
          </h2>
        </div>
  
        <div className="h-full mx-2 rounded-lg bg-[#F4F7FF]">
          <div className="h-full w-full flex flex-col">
          <div ref={div} className="scroll-smooth flex-grow flex-col-reverse overflow-y-scroll h-96 justify-end px-4 pt-6 pb-8 scroll-bottom">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.is_sender ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div
                  className={`rounded-full px-4 py-2 ${
                    msg.is_sender ? "bg-blue-500 text-white" : "bg-gray-300"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center border-t-2 py-2 px-4">
            <input
              ref={input}
              type="text"
              placeholder="Type a message"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-grow px-2 py-1 mr-2 border border-gray-200 rounded-full"
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
              onClick={handleClick}
            >
              Send
            </button>
          </div>
          </div>
        </div>
      </Card>
    );
};

export default Chat;