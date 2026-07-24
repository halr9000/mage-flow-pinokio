import argparse
import os
import subprocess
import sys

MODEL_MAP = {
    "turbo": "microsoft/Mage-Flow-Turbo",
    "rl": "microsoft/Mage-Flow",
    "edit-turbo": "microsoft/Mage-Flow-Edit-Turbo",
    "edit-rl": "microsoft/Mage-Flow-Edit",
}


def _resolve_hf_token(env: dict) -> None:
    """Bridge Pinokio's HF_TOKEN_PATH into HF_TOKEN.

    Pinokio injects HF_TOKEN_PATH (pointing at PINOKIO_HOME/cache/HF_AUTH/token)
    into every launched app's environment once the user has logged into
    Hugging Face via Pinokio's Connected Services / device-auth flow.
    huggingface_hub (used by Mage-Flow's snapshot_download) reads HF_TOKEN,
    not HF_TOKEN_PATH, so we read the file and set HF_TOKEN ourselves.
    Explicit HF_TOKEN in the environment always wins.
    """
    if env.get("HF_TOKEN"):
        return
    token_path = env.get("HF_TOKEN_PATH")
    if not token_path or not os.path.isfile(token_path):
        return
    try:
        with open(token_path, "r", encoding="utf-8") as f:
            token = f.read().strip()
        if token:
            env["HF_TOKEN"] = token
            print(f"Loaded HF_TOKEN from Pinokio Connected Services ({token_path})")
    except OSError as e:
        print(f"Warning: could not read HF_TOKEN_PATH ({token_path}): {e}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", required=True, choices=list(MODEL_MAP.keys()))
    parser.add_argument("--title", required=True)
    parser.add_argument("--host", default="0.0.0.0")
    parser.add_argument("--port", type=int, default=7860)
    args = parser.parse_args()

    repo_id = MODEL_MAP[args.model]
    launcher_root = os.path.dirname(os.path.abspath(__file__))
    app_py = os.path.join(launcher_root, "app", "mage_flow", "app.py")

    env = os.environ.copy()
    _resolve_hf_token(env)

    if not env.get("HF_TOKEN"):
        print(
            "Note: no HF_TOKEN found. Downloads will be unauthenticated (lower "
            "rate limits). Log into Hugging Face via Pinokio's Connected "
            "Services to fix, or set HF_TOKEN in this app's ENVIRONMENT file."
        )

    print(f"Launching {args.title} from {repo_id}")
    print(f"App path: {app_py}")
    print(f"Binding: {args.host}:{args.port}")

    subprocess.run(
        [sys.executable, app_py, "--host", args.host, "--port", str(args.port)],
        env=env,
    )


if __name__ == "__main__":
    main()