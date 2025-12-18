import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";

export default function VideoCall() {
    const [token, setToken] = useState(null);
    const [serverUrl, setServerUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    const meetingId = localStorage.getItem("meeting_id");  // you will set this from Dashboard
    const username = localStorage.getItem("email");

    useEffect(() => {
        async function fetchToken() {
            try {
                const res = await fetch(
                    `http://192.168.0.112:8000/meetings/join/${meetingId}?username=${username}`
                );
                const data = await res.json();

                setToken(data.token);
                setServerUrl(data.server_url);

            } catch (err) {
                console.error("Error fetching token", err);
            } finally {
                setLoading(false);
            }
        }

        fetchToken();
    }, []);

    if (loading) return <p>Loading meeting...</p>;
    if (!token) return <p>Unable to join meeting.</p>;

    return (
        <LiveKitRoom
            token={token}
            serverUrl={serverUrl}
            connect={true}
            video={true}
            audio={true}
            style={{ height: "100vh" }}
        >
            <VideoConference />
            <button
                style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "20px",
                    padding: "12px 20px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                }}
                onClick={() => window.location.href = "/dashboard"}
            >
                Leave
            </button>
        </LiveKitRoom>
    );
}
