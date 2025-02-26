import React, { useState } from "react";

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (input.trim() !== "") {
            setMessages([...messages, { text: input, sender: "user" }]);
            setInput("");
        }
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-primary text-white">Chat</div>
                <div className="card-body chat-box" style={{ height: "300px", overflowY: "auto" }}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`d-flex mb-2 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}>
                            <div className={`p-2 rounded ${msg.sender === "user" ? "bg-primary text-white" : "bg-light"}`} style={{ maxWidth: "75%" }}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="card-footer">
                    <div className="input-group">
                        <input type="text" className="form-control" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
                        <button className="btn btn-primary" onClick={sendMessage}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
