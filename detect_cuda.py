"""Detect CUDA_HOME by tracing nvcc binary location."""
import subprocess
import os
import sys

try:
    if os.name == "nt":
        proc = subprocess.run(["where", "nvcc"], capture_output=True, text=True)
    else:
        proc = subprocess.run(["which", "nvcc"], capture_output=True, text=True)

    if proc.returncode != 0:
        sys.exit(1)

    nvcc_path = proc.stdout.strip()
    if not nvcc_path:
        sys.exit(1)

    cuda_home = os.path.dirname(os.path.dirname(nvcc_path))
    print(cuda_home)
except Exception:
    sys.exit(1)