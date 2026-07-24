module.exports = {
  run: [
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: {
          _: ["git", "clone", "https://github.com/microsoft/Mage", "app"]
        }
      }
    },
    {
      method: "shell.run",
      params: {
        bluefairy: "off",
        venv: "env",
        path: "app/mage_flow",
        message: {
          _: ["uv", "sync", "--active"]
        }
      }
    },
    {
      when: "{{gpu === 'nvidia'}}",
      method: "shell.run",
      params: {
        message: {
          _: ["nvcc", "--version"]
        },
        on: [{
          event: "/release (\\d+)\\./",
          done: true
        }]
      }
    },
    {
      when: "{{gpu === 'nvidia'}}",
      method: "local.set",
      params: {
        cuda_major: "{{input.event ? input.event[1] : '12'}}"
      }
    },
    {
      when: "{{gpu === 'nvidia' && (platform === 'win32' || platform === 'linux')}}",
      method: "shell.run",
      params: {
        message: {
          _: [
            "python",
            "-c",
            "import subprocess,os,sys; p=subprocess.run(['where','nvcc'] if os.name=='nt' else ['which','nvcc'],capture_output=True,text=True); cuda_home=os.path.dirname(os.path.dirname(p.stdout.strip())) if p.returncode==0 else ''; print(cuda_home)"
          ]
        }
      },
      on: [{
        event: "/([A-Za-z]:\\\\.+|[\\/].+)/",
        done: true
      }]
    },
    {
      when: "{{gpu === 'nvidia' && (platform === 'win32' || platform === 'linux')}}",
      method: "local.set",
      params: {
        cuda_home: "{{input.event ? input.event[1] : ''}}"
      }
    },
    {
      when: "{{gpu === 'nvidia' && (platform === 'win32' || platform === 'linux')}}",
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app/mage_flow",
          cuda: "{{local.cuda_major === '13' ? 'cu130' : 'cu126'}}",
          cuda_home: "{{local.cuda_home}}"
        }
      }
    },
    {
      method: "fs.link",
      params: {
        venv: "app/mage_flow/env"
      }
    },
    {
      method: "notify",
      params: {
        html: "Install complete. Click Start Turbo or Start Edit Turbo to launch Mage-Flow."
      }
    }
  ]
}