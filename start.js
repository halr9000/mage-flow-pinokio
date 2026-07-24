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
            "{{args.title ? args.title : 'Mage-Flow Turbo'}}"
          ]
        },
        on: [{
          event: "/(http:\\/\\/[0-9.:]+)/",
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
