module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "env",
        env: {
          GRADIO_SERVER_NAME: "127.0.0.1"
        },
        path: "app/mage_flow",
        message: {
          _: [
            "python",
            "../../launch.py",
            "--model",
            "{{args.model ? args.model : 'turbo'}}",
            "--title",
            "{{args.title ? args.title : 'Mage-Flow Turbo'}}",
            "--host",
            "127.0.0.1",
            "--port",
            "{{port}}"
          ]
        },
        on: [{
          event: "/(http:\\/\\/127\\.0\\.0\\.1:[0-9]+)/",
          done: true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[1]}}"
      }
    }
  ]
}
