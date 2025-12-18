import { useEffect, useState } from "react";
import { createMeeting, listMeetings } from "../api/meetings";

export default function Dashboard() {

    const username = localStorage.getItem("email");
    const projectId = 1;        // later make dynamic
    const [title, setTitle] = useState("");
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        loadMeetings();
    }, []);

    async function loadMeetings() {
        const list = await listMeetings(projectId);
        setMeetings(list);
    }

    async function handleCreate() {
        const result = await createMeeting(title, projectId, username);
        alert("Meeting Created!");
        setTitle("");
        loadMeetings();
    }

    function joinMeeting(id) {
        localStorage.setItem("meeting_id", id);
        window.location.href = "/vc";
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome {username}</p>

            {/* CREATE MEETING */}
            <div className="container">
                <h2>Create New Meeting</h2>
                <input
                    placeholder="Meeting Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <button onClick={handleCreate}>Create Meeting</button>
            </div>

            {/* LIST MEETINGS */}
            <div className="container">
                <h2>Your Meetings</h2>

                {meetings.length === 0 && <p>No meetings yet.</p>}

                {meetings.map(meet => (
                    <div
                        key={meet.id}
                        style={{
                            padding: "10px",
                            background: "#eee",
                            marginTop: "10px",
                            borderRadius: "6px"
                        }}
                    >
                        <p><strong>{meet.title}</strong></p>
                        <p>Room: {meet.room_name}</p>

                        <button onClick={() => joinMeeting(meet.id)}>
                            Join Meeting
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
