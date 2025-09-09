import { useEffect, useState } from "react";

export function Clock() {
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        // Sau khi client hydrate mới set giờ
        setTime(new Date().toLocaleTimeString());

        const timer = setInterval(
            () => setTime(new Date().toLocaleTimeString()),
            1000
        );
        return () => clearInterval(timer);
    }, []);

    if (!time) {
        return null; // server render ra rỗng, client hydrate rồi mới fill
    }

    //TODO: Chú ý có thể còn có lỗi server render HTML không match với client ỏ chỗ khác nữa
    return <h2>🕒 {time}</h2>;
}