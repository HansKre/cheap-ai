# Readme

## Setup and run ollama

<http://ollama.com/>

```bash
brew install ollama
# To start ollama now and restart at login:
brew services start ollama
# to stop ollama service:
brew services stop ollama
# Or, if you don't want/need a background service you can just run:
OLLAMA_FLASH_ATTENTION="1" OLLAMA_KV_CACHE_TYPE="q8_0" /opt/homebrew/opt/ollama/bin/ollama serve
# list installed models
ollama list
# install models
ollama run phi3
ollama run llava-llama3
```

## Models

### Main Use Case of Phi-3

Phi-3 is a family of small language models (SLMs) developed by Microsoft, designed to deliver strong language understanding and generation capabilities while being highly efficient and deployable in resource-constrained environments

### Main Use Case of LLaVA-Llama3

LLaVA-Llama3 is a large multimodal AI model that combines advanced language understanding (from the Llama 3 backbone) with powerful visual processing capabilities (via a CLIP-based vision encoder). Its primary use case is to enable AI systems to process and understand both images and text together, making it especially suitable for tasks that require interpreting visual information alongside natural language

## Ollama in docker

```bash
# -v ollama:/root/.ollama // Persist models and config
docker run -d -v ollama:/root/.ollama -p 11434:11434 --restart always --name ollama ollama/ollama
docker exec -it ollama ollama run phi3
```

## OpenWebUi

<https://openwebui.com/>

<https://github.com/Teachings/AIServerSetup/blob/main/02-Ollama%20And%20OpenWebUI/01-OllamaAndOpenWebUISetup.md>

```bash
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

## ComfyUI

<https://www.comfy.org/>

## Text-To-Image Models

<https://huggingface.co/models?pipeline_tag=text-to-image&sort=trending&search=uncensored>

<https://civitai.com/models>

```bash
brew install git-lfs
cd ~/Documents/ComfyUI/models/checkpoints
# When prompted for a password, use an access token with write permissions.
# Generate one from your settings: https://huggingface.co/settings/tokens
git clone https://huggingface.co/black-forest-labs/FLUX.1-dev
username: git
token: <your token>
# resolve pointers / pull the large files
git lfs install
git lfs pull
```

### ComfyUI konfigurieren

```yaml
# in /Users/<user>/Library/Application Support/ComfyUI/extra_models_config.yaml'
additional_folder:
  checkpoints: /Users/<user>/Downloads/ComfyUI/models/checkpoints
```

## Todos

1. handle missing connection to ollama server
2. in routes > streamText: what's the difference between `messages`, `system`, `prompt` (see usage-example in <https://www.npmjs.com/package/ai>)
3. create image generating ai-app
