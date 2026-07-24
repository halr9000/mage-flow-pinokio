module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: {
          _: ["git", "pull"]
        }
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: {
          _: ["git", "pull"]
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
    }
  ]
}
