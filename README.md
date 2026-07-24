# Mage-Flow Pinokio

A Pinokio launcher for Microsoft's Mage-Flow image generation and editing models.

## What it does

- **Text-to-image**: Generate images from text prompts using Mage-Flow Turbo (4 steps) or RL (20 steps)
- **Image editing**: Edit images with instruction-based prompts using Mage-Flow Edit Turbo (4 steps) or Edit RL (30 steps)
- Native resolution support: 512 to 2048 on any aspect ratio
- Compact 4B model — efficient VRAM usage, fast inference

## How to use

1. Click **Install** to clone the repo and install dependencies
2. Choose a model variant:
   - **Start Turbo (T2I)** — 4-step generation, fastest
   - **Start RL (T2I)** — 20-step generation, higher quality
   - **Start Edit Turbo** — 4-step editing
   - **Start Edit RL** — 30-step editing, higher fidelity
3. Wait for the Gradio web UI to appear
4. Use the web UI to generate or edit images

## API Access

The app launches a Gradio server at `http://127.0.0.1:<port>`. See the [Gradio API docs](https://www.gradio.app/docs) for programmatic access.

## Model Details

| Model | Task | Steps | HF Repo |
|-------|------|-------|---------|
| Mage-Flow-Turbo | T2I | 4 | microsoft/Mage-Flow-Turbo |
| Mage-Flow (RL) | T2I | 20 | microsoft/Mage-Flow |
| Mage-Flow-Edit-Turbo | Edit | 4 | microsoft/Mage-Flow-Edit-Turbo |
| Mage-Flow-Edit (RL) | Edit | 30 | microsoft/Mage-Flow-Edit |

## Links

- [Mage-Flow on Hugging Face](https://huggingface.co/microsoft/Mage-Flow)
- [Mage-Flow on GitHub](https://github.com/microsoft/Mage)
- [Paper](https://huggingface.co/papers/2607.19064)
