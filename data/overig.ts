import type { Product } from "@/types";

export const overig: Product[] = [
  {
    id: "bekers-klein",
    naam: "Bekers Klein",
    categorie: "drooggoed",
    telCategorie: "drooggoed",
    bestelBij: "drooggoed",
    bestelGroep: "drooggoed",
    buffers: {
      roermond: 1,
      nijmegen: 1,
    },
    volgorde: 1,
    actief: true,
    alternatieveNamen: [
      "bekers klein",
      "beker klein",
      "kleine bekers",
    ],
  },

  {
    id: "bekers-middel",
    naam: "Bekers Middel",
    categorie: "drooggoed",
    telCategorie: "drooggoed",
    bestelBij: "drooggoed",
    bestelGroep: "drooggoed",
    buffers: {
      roermond: 1,
      nijmegen: 1,
    },
    volgorde: 2,
    actief: true,
    alternatieveNamen: [
      "bekers middel",
      "beker middel",
      "middel bekers",
      "medium bekers",
    ],
  },

  {
    id: "lepels",
    naam: "Lepels",
    categorie: "drooggoed",
    telCategorie: "drooggoed",
    bestelBij: "drooggoed",
    bestelGroep: "drooggoed",
    buffers: {
      roermond: 1,
      nijmegen: 1,
    },
    volgorde: 3,
    actief: true,
    alternatieveNamen: [
      "lepels",
      "lepels klein",
    ],
  },

  {
    id: "softijs",
    naam: "Softijs",
    categorie: "drooggoed",
    telCategorie: "drooggoed",
    bestelBij: "drooggoed",
    bestelGroep: "drooggoed",
    buffers: {
      roermond: 6,
      nijmegen: 4,
    },
    volgorde: 4,
    actief: true,
    alternatieveNamen: [
      "softijs",
      "soft ijs",
    ],
  },

  {
    id: "slagroom",
    naam: "Slagroom",
    categorie: "ijs",
    telCategorie: "speciaalsmaken",
    bestelBij: "ijskeuken",
    bestelGroep: "ijs",
    buffers: {
      roermond: 1,
      nijmegen: 2,
    },
    volgorde: 5,
    actief: true,
    alternatieveNamen: [
      "slagroom",
    ],
  },
];