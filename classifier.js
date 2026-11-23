// reads json files and takes a prompt and return how EASY it looks (a number from 0 to 1) 

// vec = data from vectorizer.json
// mdl = data from model_coefficients.json
function createClassifier(vec, mdl) {
  const vocab = new Map(Object.entries(vec.vocabulary));

//weights giving to words
//Negative = pushes toward EASY, positive = pushes toward HARD
  const coef = mdl.coefficients[0];
  const intercept = mdl.intercept[0]; //starting value before any words are counted
  const [nMin, nMax] = vec.ngram_range; //[1, 2] = single words and 2-word pairs

//converting words to lowercase to split into tokens
  function tokenize(text) {
    return text.toLowerCase().match(/\b\w\w+\b/g) || [];
  }

//converting tokens into features (n-grams) - chatgpt 
  function features(tokens) {
    const out = [];
    for (let n = nMin; n <= nMax; n++) {
      for (let i = 0; i + n <= tokens.length; i++) {
        out.push(tokens.slice(i, i + n).join(" "));
      }
    }
    return out;
  }

//calculating how much easy is prompt
  function predict(text) {
//counting only the words that are in the vocabulary and ignoring the rest
    const counts = new Map();
    for (const f of features(tokenize(text))) {
      if (vocab.has(f)) counts.set(f, (counts.get(f) || 0) + 1);
    }

//importance of each word in the prompt, scaled by the length of the prompt
    let norm = 0;
    const vals = [];
    for (const [f, c] of counts) {
      const idx = vocab.get(f);
      const v = c * vec.idf[idx];
      vals.push([idx, v]);
      norm += v * v;
    }
//scaling everything by the length of the prompt so that longer prompts don't automatically get higher scores
    norm = Math.sqrt(norm);

//adding: z = starting value + sum of (weight x importance)
    let z = intercept;
    if (norm > 0) {
      for (const [idx, v] of vals) z += coef[idx] * (v / norm);
    }

//using sigmoid formula here
    const pHard = 1 / (1 + Math.exp(-z));
    return { pHard, pEasy: 1 - pHard };
  }

  return { predict };
}

//for testing in Node
if (typeof module !== "undefined") module.exports = { createClassifier };