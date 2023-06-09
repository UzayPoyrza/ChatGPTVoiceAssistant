from flask import Flask, request, jsonify,render_template
import openai
openai.api_key = "OPENAI_API_KEY"

app = Flask(__name__, static_folder='static')

messages = [
    {"role": "system", "content": "You are a kind helpful assistant."},
]
@app.route('/')
def index():
    return render_template('voiceassistant.html')
def getresponse(inp):
    while True:
        message = inp
        if message:
            messages.append(
                {"role": "user", "content": message},
            )
            chat = openai.ChatCompletion.create(
                model="gpt-3.5-turbo", messages=messages
            )

        reply = chat.choices[0].message.content
        #print(f"ChatGPT: {reply}")
        return reply #temporary

      #  messages.append({"role": "assistant", "content": reply})

@app.route('/process-input', methods=['POST'])
def process_input():
    data = request.json
    input_text = data['input']
    response = getresponse(input_text)
    print(data)
    print(response)
    return jsonify({"response": response})


if __name__ == "__main__":
    app.run(port=8000, debug=True)