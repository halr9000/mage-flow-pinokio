module.exports = {
  requires: {
    bundle: "ai"
  },
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
      when: "{{gpu === 'nvidia' && (platform === 'win32' || platform === 'linux')}}",
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app/mage_flow"
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
