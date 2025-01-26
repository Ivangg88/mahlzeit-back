import { Ingredient, Process } from "../types/interfaces";

const ingredients: Ingredient[] = [{ name: "", quantity: "", unit: "" }];
const process: Process[] = [{ process: "", picture: "", backupPicture: "" }];

const preloadStore = {
  mockRecipte: {
    name: "Mock recipte",
    dificulty: "Fácil",
    autor: "",
    id: "",
    persons: 0,
    ingredients,
    process,
    image: "",
    backupImage: "",
    authorId: "",
  },
  mockProtoRecipte: {
    name: "Mock recipte",
    dificulty: "Fácil",
    autor: "",
    persons: 0,
    ingredients,
    process,
    image: "",
    backupImage: "",
  },
};

export default preloadStore;
