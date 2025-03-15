import React from "react";
import { useState, useRef, useEffect } from "react";
import { MoreVertical, ChevronLeft } from "lucide-react";
import { BASE_URL, createSocketConnection } from "../../utils/constants";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const socketRef = useRef(null);
  const user = useSelector((store) => store.user);
  const { _id: userId, firstName, lastName } = user || {};
  const { targetUserId } = useParams();

  const scrollToBottom = () => {
    // Use the chat container reference instead of scrolling the entire page
    if (messagesEndRef.current && chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const getMessages = async () => {
    try {
      const chatMessages = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      const messages = chatMessages?.data?.chat?.messages;
      const sortedMessages = messages.map((message, index) => {
        const date = new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const { _id, firstName } = message.senderId[0];
        return {
          id: index,
          text: message.text,
          sender: _id,
          name: firstName,
          time: date,
        };
      });
      setMessages(sortedMessages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    socketRef.current = createSocketConnection();
    socketRef.current.emit("joinChat", {
      userId,
      targetUserId,
      firstName,
    });

    socketRef.current.on(
      "messageReceived",
      ({ firstName, text, userId: currUserId }) => {
        setMessages((messages) => [
          ...messages,
          {
            id: messages.length + 1,
            text,
            sender: currUserId,
            name: firstName,
            time: new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
          },
        ]);
      }
    );
    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);

  const handleSend = (e) => {
    // Prevent default to stop form submission behavior
    if (e) e.preventDefault();

    if (newMessage.trim()) {
      setMessages((messages) => [
        ...messages,
        {
          id: messages.length + 1,
          text: newMessage,
          sender: userId,
          time: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        },
      ]);
      socketRef.current.emit("sendMessage", {
        firstName,
        targetUserId,
        userId,
        text: newMessage,
      });
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid page reload or form submission
      handleSend();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1e2126] overflow-hidden">
      <div className="w-full max-w-4xl mx-auto my-3 h-screen md:h-auto px-2">
        <div className="flex flex-col h-[calc(100vh-24px)] md:h-[600px] bg-[#131517] rounded-lg shadow-lg">
          <div className="bg-[#767676] p-4 flex items-center rounded-t-lg">
            <ChevronLeft
              className="w-6 h-6 text-gray-400 cursor-pointer"
              onClick={() => {
                navigate("/connections");
              }}
            />
            <div className="flex-1 ml-4 ">
              <h2 className="text-white font-medium">Chat Room</h2>
              <p className="text-green-500 text-sm">Online</p>
            </div>
            <MoreVertical className="w-6 h-6 text-gray-400 cursor-pointer" />
          </div>

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === userId ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`max-w-xs md:max-w-sm rounded-lg p-3 ${
                    message.sender === userId
                      ? "bg-blue-600 text-white"
                      : "bg-[#1e2126] text-white"
                  }`}
                >
                  {message.sender !== userId && (
                    <p className="text-sm text-gray-400 mb-1">{message.name}</p>
                  )}
                  <p className="whitespace-pre-line break-words">
                    {message.text}
                  </p>
                  <span className="text-xs text-gray-300 block text-right mt-1">
                    {message.time}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="bg-[#767676] p-4 rounded-b-lg">
            <div className="flex items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="w-full bg-[#131517] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="ml-2 bg-blue-600 text-white rounded-lg px-4 py-2 hidden md:block"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
