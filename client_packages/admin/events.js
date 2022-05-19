const { toggleNoclip } = require("./player/admin/controller.js");

mp.events.add("client_packages/player/admin/events//toggleNoclip", (player) => {
  toggleNoclip();
});