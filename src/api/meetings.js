const BASE = "https://nimbus-uthm.onrender.com/meetings";

export async function createMeeting(title, projectId, createdBy) {
    const res = await fetch(`${BASE}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title,
            project_id: projectId,
            created_by: createdBy
        })
    });
    return res.json();
}

export async function listMeetings(projectId) {
    const res = await fetch(`${BASE}/list/${projectId}`);
    return res.json();
}
