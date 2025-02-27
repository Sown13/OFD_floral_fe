import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import socket from "../config/socket";
import { jwtDecode } from "jwt-decode";
import toastMessage from "../components/Toast";

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [decodedToken, setDecodedToken] = useState(null);
    const navigate = useNavigate();
    const chatBoxRef = useRef(null);

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }
        const handleMessage = (message) => {
            console.log("📩 New message from server:", message);
            setMessages((prevMessages) => [...prevMessages, message]);
        };
        socket.on("receiveMessage", handleMessage);
        return () => {
            socket.off("receiveMessage", handleMessage);
        };
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setDecodedToken(decoded);
            } catch (error) {
                console.error("Invalid token:", error);
                setDecodedToken(null);
            }
        }
    }, []);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = () => {
        if (!decodedToken) {
            toastMessage.error("Bạn cần đăng nhập để tiếp tục");
            setTimeout(() => {
                navigate("/login");
            }, 800);
            return;
        }
        if (input.trim() !== "") {
            const messageData = {
                text: input,
                sender: decodedToken.username || "Anonymous",
            };
            socket.emit("sendMessage", messageData);
            setInput("");
        }
    };

    return (
        <div>
            {!isOpen && (
                <button
                    className="btn btn-info chat-icon"
                    onClick={() => setIsOpen(true)}
                    style={{
                        position: "fixed",
                        bottom: "40px",
                        right: "20px",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                >
                    <FontAwesomeIcon icon="fa-regular fa-comment" />
                </button>
            )}
            {isOpen && (
                <div
                    style={{
                        position: "fixed",
                        bottom: "40px",
                        right: "20px",
                        width: "300px",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        border: "1px solid #ccc",
                    }}
                >
                    <div className="card">
                        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                            Hỗ trợ trực tuyến
                            <button className="btn btn-sm btn-danger" onClick={() => setIsOpen(false)}>
                                <FontAwesomeIcon icon="fa-solid fa-times" />
                            </button>
                        </div>
                        <div className="card-body chat-box" style={{ height: "400px", overflowY: "auto" }} ref={chatBoxRef}>
                            {messages.map((msg, index) => (
                                <div key={index} className={`d-flex mb-2 ${msg.sender === decodedToken?.username ? "justify-content-end" : "justify-content-start"}`}>
                                    <div className={`p-2 rounded ${msg.sender === decodedToken?.username ? "bg-primary text-white" : "bg-light"}`} style={{ maxWidth: "75%" }}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="card-footer">
                            <div className="input-group">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        sendMessage();
                                    }}
                                >
                                    <div className="input-group">
                                        <input type="text" className="form-control" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
                                        <button className="btn btn-primary" type="submit">
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBox;
