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

    # Keep GRADIO_SERVER_NAME/GRADIO_SHARE unset; app.py uses argparse defaults
    # (0.0.0.0:7860) which we override via --host/--port.
    # Do NOT set MAGEFLOW_HF_DIR — that's for local checkpoint dirs, not HF repo IDs.
    # When unset, app.py uses the real HF repo IDs (microsoft/Mage-Flow-Turbo, etc.).

    print(f"Launching {args.title} from {repo_id}")
    print(f"App path: {app_py}")
    print(f"Binding: {args.host}:{args.port}")

    subprocess.run(
        [sys.executable, app_py, "--host", args.host, "--port", str(args.port)],
        env=env,
    )


if __name__ == "__main__":
    main()