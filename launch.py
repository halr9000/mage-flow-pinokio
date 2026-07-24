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
    args = parser.parse_args()

    repo_id = MODEL_MAP[args.model]

    env = os.environ.copy()
    env["MAGEFLOW_HF_DIR"] = repo_id
    env["GRADIO_SERVER_NAME"] = "127.0.0.1"
    env["GRADIO_SHARE"] = "0"

    # launch.py is in the Pinokio launcher root, but start.js runs from app/mage_flow
    # So we use ../launch.py relative to the shell cwd
    launcher_root = os.path.dirname(os.path.abspath(__file__))
    app_py = os.path.join(launcher_root, "app", "mage_flow", "app.py")

    print(f"Launching {args.title} from {repo_id}")
    print(f"App path: {app_py}")

    # Launch the Gradio app — it reads MAGEFLOW_HF_DIR and GRADIO_SERVER_NAME
    subprocess.run([sys.executable, app_py], env=env)


if __name__ == "__main__":
    main()
