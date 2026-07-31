export type Taak = {
  id: string;
  taak: string;
};

export type TaakCategorie = {
  categorie: string;
  taken: Taak[];
};

export const weektakenNijmegen: TaakCategorie[] = [
  {
    categorie: "Buitenplaats onderhouden",
    taken: [
      {
        id: "buiten_001",
        taak: "Onkruid weghalen en vegen, ijsvlekken wegschrobben",
      },
      {
        id: "buiten_002",
        taak: "Webben langs deurposten en ramen buitenzijde verwijderen",
      },
      {
        id: "buiten_003",
        taak: "Parkeerplaatsen nalopen op afval van Clevers",
      },
    ],
  },

  {
    categorie: "Vaatstraat werkzaamheden",
    taken: [
      {
        id: "vaat_001",
        taak: "Bodemplaat en voorraadtanks afnemen",
      },
      {
        id: "vaat_002",
        taak: "Poten van de vaatstraat reinigen",
      },
      {
        id: "vaat_003",
        taak: "Wanden van de vaatstraat afnemen",
      },
      {
        id: "vaat_004",
        taak: "Bovenplanken afnemen",
      },
      {
        id: "vaat_005",
        taak: "Voorraad sorteren",
      },
      {
        id: "vaat_006",
        taak: "Bestekbakken reinigen in de vaatwasser",
      },
      {
        id: "vaat_007",
        taak: "Onder de bodemplaat stofzuigen en dweilen",
      },
      {
        id: "vaat_008",
        taak: "Wit kastje verplaatsen en daaronder reinigen",
      },
      {
        id: "vaat_009",
        taak: "Wit kastje afnemen",
      },
    ],
  },

  {
    categorie: "Vitrine werkzaamheden",
    taken: [
      {
        id: "vitrine_001",
        taak: "Grote beurt vitrine, bodemplaten verwijderen en reinigen",
      },
      {
        id: "vitrine_002",
        taak: "IJzeren houders met smaakkaartjes afnemen",
      },
    ],
  },

  {
    categorie: "Slagroom & Toppings",
    taken: [
      {
        id: "slagroom_001",
        taak: "Slagroomwieltje reinigen (wekelijkse reiniging)",
      },
      {
        id: "slagroom_002",
        taak: "Chocodip reinigen en aanvullen",
      },
    ],
  },

  {
    categorie: "Gastgedeelte",
    taken: [
      {
        id: "gast_001",
        taak: "Ramen binnenzijde zemen",
      },
      {
        id: "gast_002",
        taak: "Onder de kussens van de banken schoonmaken",
      },
      {
        id: "gast_003",
        taak: "Zwarte tafelpoten afnemen",
      },
      {
        id: "gast_004",
        taak: "Voetjes van stoelen reinigen",
      },
      {
        id: "gast_005",
        taak: "Webben verwijderen van plafond en lampen",
      },
      {
        id: "gast_006",
        taak: "Kinderstoelen reinigen inclusief poten",
      },
      {
        id: "gast_007",
        taak: "Bovenste planken boven de toonbank afnemen",
      },
    ],
  },

  {
    categorie: "Toiletten",
    taken: [
      {
        id: "toilet_001",
        taak: "Wanden afnemen",
      },
      {
        id: "toilet_002",
        taak: "Handdoekjes aanvullen",
      },
      {
        id: "toilet_003",
        taak: "Toiletpapier aanvullen",
      },
    ],
  },

  {
    categorie: "Buffet",
    taken: [
      {
        id: "buffet_001",
        taak: "Aircofilter reinigen",
      },
      {
        id: "buffet_002",
        taak: "Airco randen afnemen",
      },
      {
        id: "buffet_003",
        taak: "Glazen planken afstoffen",
      },
      {
        id: "buffet_004",
        taak: "Coupeglazen controleren",
      },
      {
        id: "buffet_005",
        taak: "Binnenzijde kastjes reinigen",
      },
      {
        id: "buffet_006",
        taak: "Lepels controleren en poleren indien nodig",
      },
      {
        id: "buffet_007",
        taak: "Bestekbakken reinigen",
      },
      {
        id: "buffet_008",
        taak: "Lades reinigen",
      },
      {
        id: "buffet_009",
        taak: "Ruimte met lege frisdrankkratten reinigen",
      },
    ],
  },

  {
    categorie: "HACCP",
    taken: [
      {
        id: "haccp_001",
        taak: "Deksels ontstickeren met wasbenzine",
      },
      {
        id: "haccp_002",
        taak: "HACCP-taken afronden in de De Witt-app",
      },
    ],
  },

  {
    categorie: "Voorraad & Kantoor",
    taken: [
      {
        id: "voorraad_001",
        taak: "Producten groeperen en sorteren",
      },
      {
        id: "voorraad_002",
        taak: "Schone was netjes opgevouwen in de bak leggen",
      },
      {
        id: "voorraad_003",
        taak: "Bureau afnemen",
      },
      {
        id: "voorraad_004",
        taak: "Stofzuigen",
      },
    ],
  },
];