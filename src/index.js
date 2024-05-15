import { View } from "./js/view.js";
import { Model } from "./js/model.js";
import { Controller } from "./js/controller.js";

const app = new Controller(new View(), new Model());
app.init();
