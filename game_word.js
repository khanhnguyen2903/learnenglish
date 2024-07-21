const speakButton = document.querySelector(".btn_listen");
const img_question = document.querySelector(".img_word");
const word = document.querySelector(".word");
const btn_next = document.querySelector(".btn_next");
const text_record = document.querySelector(".record");
const img_micro = document.querySelector(".img_micro");

let i = 0;
text_record.innerHTML = "";
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
  console.error("Trình duyệt của bạn không hỗ trợ Web Speech API");
  text_record.textContent = "Trình duyệt của bạn không hỗ trợ Web Speech API";
} else {
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  img_micro.addEventListener("click", () => {
    if (img_micro.src.includes("micro")) {
      text_record.innerHTML = "Đang thu...";
      img_micro.setAttribute("src", "images/wave_speech.png");
      recognition.start();
      console.log("Recording started");
    } else {
      text_record.innerHTML = "";
      img_micro.setAttribute("src", "images/micro.png");
      //recognition.stop();
      console.log("Recording stopped");
    }
    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      text_record.textContent = transcript;
      img_micro.setAttribute("src", "images/micro.png");
    };
  });

  // recognition.onerror = (event) => {
  //   console.error("Speech recognition error", event.error);
  // };
}

// function display question
function displayQuestion(question) {
  // Display image
  img_question.setAttribute("src", question.url_image);
  // Display word
  const textNode = document.createTextNode(question.answer);
  word.appendChild(textNode);
}

// Create function to speak text
// function speak(message) {
//   var msg = new SpeechSynthesisUtterance(message);
//   var voices = window.speechSynthesis.getVoices();
//   msg.voice = voices[0];
//   window.speechSynthesis.speak(msg);
// }
speakButton.addEventListener("click", () => {
  //speak(question_word[i].answer);
  responsiveVoice.speak(question_word[i].answer, "UK English Male");
});

displayQuestion(question_word[0]);

// click button next to new word
btn_next.addEventListener("click", () => {
  img_question.setAttribute("src", "");
  word.textContent = "";
  text_record.textContent = "";
  img_micro.setAttribute("src", "images/micro.png");
  i++;
  if (i === question_word.length) {
    displayQuestion(question_word[0]);
    i = 0;
  } else {
    displayQuestion(question_word[i]);
  }
});
