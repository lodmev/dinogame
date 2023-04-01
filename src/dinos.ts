import indominus from "./img/indominus.jpg"
import scorpius from "./img/scorpius.png"
import deinonychus from "./img/deinonychus.webp"
import sinoceratops from "./img/sinoceratops.webp"
import kentrosaurus from "./img/kentrosaurus.webp"
import concavenator from "./img/concavenator.webp"
export type Dinosaur = {
  name: string;
  imageUrl: string;
};
export type Dinosaurs = {
  [id: number | string]: Dinosaur;
};
export const dinosaurs: Dinosaurs = {
  1: {
    name: "ИНДОМИНУС",
    imageUrl: indominus,
  },
  2: {
	  name: "СКОРПИОС",
	  imageUrl: scorpius,
  },
  3: {
	  name: "ДЕЙНОНИХ",
	  imageUrl: deinonychus,
  },
  4: {
	  name: "СИНОЦЕРАТОПС",
	  imageUrl: sinoceratops
  },
  5: {
	  name:"КЕНТРОЗАВР",
	  imageUrl: kentrosaurus
  },
  6: {
	  name: "КОНКАВЕНАТОР",
	  imageUrl: concavenator
  }
};
