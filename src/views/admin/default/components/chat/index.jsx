import Card from "components/card";

import React from 'react';

const Chat = () => {

    const [inputValue, setInputValue] = React.useState("");

    return (
      <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
        <div className="mb-2 flex items-center justify-between px-6">
          <h2 className="text-lg font-bold text-navy-700 dark:text-white">
              Chat
          </h2>
        </div>
  
        <div className="h-full mx-2 rounded-lg bg-[#F4F7FF]">
          <div className="h-full w-full flex flex-col">
          <div className="flex-grow overflow-auto justify-end px-4 pt-6 pb-8">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.is_author ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div
                  className={`rounded-full px-4 py-2 ${
                    msg.is_author ? "bg-blue-500 text-white" : "bg-gray-300"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center border-t-2 py-2 px-4">
            <input
              type="text"
              placeholder="Type a message"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-grow px-2 py-1 mr-2 border border-gray-200 rounded-full"
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
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