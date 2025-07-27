
const API_URL = "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct";  // Puedes cambiarlo por otro
const HF_TOKEN = "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";

async function sendMessage() {
    const input = document.getElementById("user-input").value;
    const chatBox = document.getElementById("chat-box");

    const userMessage = document.createElement("p");
    userMessage.textContent = "Tú: " + input;
    chatBox.appendChild(userMessage);

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${HF_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: input })
    });

    const data = await response.json();
    const botMessage = document.createElement("p");

    if (data.error) {
        botMessage.textContent = "Error al generar respuesta: " + data.error;
    } else {
        botMessage.textContent = "IA: " + data[0].generated_text;
    }
    chatBox.appendChild(botMessage);
}
