import { useState } from "react";

export default function Contact() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Gửi từ ${name}: ${message}`);
    };

    return (
        <div>
            <h1>Contact us 📩</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Tên:{" "}
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Tin nhắn:{" "}
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Gửi</button>
            </form>
        </div>
    );
}