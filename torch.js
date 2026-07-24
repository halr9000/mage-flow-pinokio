module.exports = {
  run: [
    {
      when: "{{gpu === 'nvidia' && (platform === 'win32' || platform === 'linux')}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        env: {
          CUDA_HOME: "{{envs.CUDA_PATH || (platform === 'win32' ? 'C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA\\v12.8' : '/usr/local/cuda')}}"
        },
        message: [
          "uv pip install --force-reinstall torch==2.13.0 torchvision==0.28.0 --index-url https://download.pytorch.org/whl/{{args && args.cuda ? args.cuda : 'cu126'}}",
          "uv pip install setuptools wheel ninja",
          "uv pip install --no-build-isolation flash-attn==2.8.3"
        ]
      },
      next: null
    }
  ]
}