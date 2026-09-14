# WaterYouPromptin 💧

A Chrome extension that helps you think before you prompt.

## What does it do?

When you type a question into ChatGPT, this extension checks it first:

- **If your question is simple** (like "what is the capital of France" or "define gravity") — it gently reminds you that a quick Google search might be faster, and asks if you'd like to search instead.
- **If your question actually needs AI** (like debugging code, writing something creative, or personal advice) — it stays out of your way and lets you continue normally.

The goal is **not to block AI**. It's to make people pause for a second and ask: "do I really need AI for this?" Small changes like this can reduce unnecessary computing power and energy use over time.

## Why we built this

Generative AI uses real energy and resources every time it runs. A lot of simple questions people ask AI could just as easily be answered with a normal search engine. This extension nudges users toward the right tool for the right question — without taking away their choice.

## How it works

1. **Detects** your prompt when you submit it on ChatGPT
2. **Classifies** it as either "easy to search" or "needs AI," using a mix of simple rules and a small trained model
3. **Shows a gentle nudge** if the question looks easy to search, with the option to search instead or continue with AI anyway
4. **Logs your choice locally** on your own device (not on any server) so you can see your own usage patterns over time

## Tech stack

- Chrome Extension (Manifest V3)
- HTML, CSS, JavaScript
- Python (for training the classifier)
- scikit-learn (TF-IDF + Logistic Regression model)
- Local storage only — no cloud, no external servers, your data stays on your device

## Project status

🚧 Work in progress — student project, currently in development.

## Team

- **[Name]** — Extension development
- **[Name]** — Classifier / Machine Learning
- **[Name]** — Data, research & documentation

## Project documents

- `requirements.md` — what the project needs to do
- `Risk.md` — known risks and how we're handling them

## Disclaimer

Any environmental impact numbers shown in this extension (like energy or water use) are estimates based on published research, shown as ranges with sources — not exact measurements. We take this seriously and don't want to make claims we can't back up.