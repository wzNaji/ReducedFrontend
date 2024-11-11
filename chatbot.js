document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("sendMessageButton").addEventListener("click", sendMessage);

})

async function sendMessage() {
    const message = document.getElementById("message").value.trim();
    if (!message) {
        alert("Please enter a message.");
        return;
    }

    const url = `http://localhost:8080/api/chatbot/reduced?message=${encodeURIComponent(message)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${await response.text()}`);
        }
        const data = await response.json();
        
        // Display the response and token usage
        document.getElementById("responseText").innerText = data.response;
        document.getElementById("tokenUsage").innerText = 
            `Prompt Tokens: ${data["Prompt tokens"]}, Total Tokens: ${data["Total tokens"]}`;
    } catch (error) {
        document.getElementById("responseText").innerText = error.message;
        document.getElementById("tokenUsage").innerText = "";
    }
}
