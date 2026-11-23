const fs = require('fs');
const path = require('path');
const { createClassifier } = require('./classifier');

const vec = JSON.parse(fs.readFileSync(path.join(__dirname, 'vectorizer.json'), 'utf8'));
const mdl = JSON.parse(fs.readFileSync(path.join(__dirname, 'model_coefficients.json'), 'utf8'));
const classifier = createClassifier(vec, mdl);
console.log("Classifier successfully loaded!\n");

const THRESHOLD = 0.6;

// [prompt, should the popup appear?]
const tests = [
  ["what is the capital of france", "POPUP"],
  ["define osmosis", "POPUP"],
  ["what does HTTP stand for", "POPUP"],
  ["help me fix my bug", "NO_POPUP"],
  ["can you review my resume", "NO_POPUP"],
  ["fix this", "NO_POPUP"],
  ["write a poem about my dog", "NO_POPUP"],
];

let wrong = 0;
for (const [prompt, expected] of tests) {
  const { pEasy } = classifier.predict(prompt);
  const action = pEasy >= THRESHOLD ? "POPUP" : "NO_POPUP";
  const ok = action === expected;
  if (!ok) wrong++;
  console.log(`${ok ? "OK  " : "FAIL"} | pEasy=${pEasy.toFixed(3)} | ${action} | ${prompt}`);
}
console.log(wrong === 0 ? "\nAll good" : `\n${wrong} unexpected result(s)`);