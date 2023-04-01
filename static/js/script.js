let toggled = false;
const recordBtn = document.getElementById("recordBtn");
const output = document.getElementById("output");
const status = document.getElementById("status");
const result = document.getElementById("result");

function toggleRecording() {
    toggled = !toggled;
    if(toggled){
    const recognition = new window.webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.onstart = () => {
        recordBtn.classList.add("active");
        output.innerText = "";
        status.innerText = "Listening...";
    };
    recognition.onerror = event => {
        status.innerText = "Error occurred in recognition: " + event.error;
    };
    recognition.onresult = event => {
        const interimTranscript = event.results[0][0].transcript;
        output.innerText = interimTranscript;
    };
    recognition.start();


    }    else{
        recordBtn.classList.remove("active");
        status.innerText = "Stopping Listen";
        processInput(output.innerText);
        }
}

async function processInput(input) {
    const response = await fetch("/process-input", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "input": input
        })
    });
    const data = await response.json();
    result.innerText = data.response;
}