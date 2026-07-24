const path = require('path')

module.exports = {
  version: "7.0",
  title: "Mage-Flow",
  description: "Microsoft's 4B native-resolution image generation and editing model. Text-to-image and instruction-based editing with Base, RL-aligned, and Turbo variants. https://github.com/microsoft/Mage",
  icon: "icon.png",
  menu: async (kernel) => {
    let installing = await kernel.running(__dirname, "install.js")
    let installed = await kernel.exists(__dirname, "app", "mage_flow", "env")
    let running = await kernel.running(__dirname, "start.js")
    let supportsEdit = true

    if (installing) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js"
      }]
    } else if (installed) {
      if (running) {
        let local = kernel.memory.local[path.resolve(__dirname, "start.js")]
        if (local) {
          if (!local.url) {
            return [{
              default: true,
              icon: "fa-solid fa-terminal",
              text: "Terminal",
              href: "start.js"
            }]
          }
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url
          }, {
            icon: "fa-solid fa-terminal",
            text: "Terminal",
            href: "start.js"
          }]
        } else {
          return [{
            default: true,
            icon: "fa-solid fa-terminal",
            text: "Terminal",
            href: "start.js"
          }]
        }
      } else {
        let menu = [{
          icon: "fa-solid fa-bolt",
          text: "Start Turbo (T2I)",
          href: "start.js",
          params: {
            model: "turbo",
            title: "Mage-Flow Turbo",
            mode: "t2i"
          }
        }, {
          icon: "fa-solid fa-wand-magic-sparkles",
          text: "Start RL (T2I)",
          href: "start.js",
          params: {
            model: "rl",
            title: "Mage-Flow RL",
            mode: "t2i"
          }
        }, {
          icon: "fa-solid fa-pen-to-square",
          text: "Start Edit Turbo",
          href: "start.js",
          params: {
            model: "edit-turbo",
            title: "Mage-Flow Edit Turbo",
            mode: "edit"
          }
        }, {
          icon: "fa-solid fa-image",
          text: "Start Edit RL",
          href: "start.js",
          params: {
            model: "edit-rl",
            title: "Mage-Flow Edit RL",
            mode: "edit"
          }
        }]

        menu.push({
          icon: "fa-solid fa-arrows-rotate",
          text: "Update",
          href: "update.js"
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js"
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "Reset",
          href: "reset.js"
        })

        return menu
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js"
      }]
    }
  }
}