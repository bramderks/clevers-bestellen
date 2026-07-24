import { Seizoen } from "./seizoen";

export interface BestelConfig {
  seizoen: Seizoen | "auto";

  /**
   * Gebruik de ingestelde buffervoorraad.
   */
  gebruikBuffer: boolean;

  /**
   * Rond af op de ingestelde besteleenheid.
   */
  afrondenOpBesteleenheid: boolean;

  /**
   * Toekomstige uitbreidingen
   */
  gebruikWeerCorrectie: boolean;

  gebruikHistorischeVerkoop: boolean;

  gebruikEvenementen: boolean;
}

export const bestelConfig: BestelConfig = {
  seizoen: "auto",

  gebruikBuffer: true,

  afrondenOpBesteleenheid: true,

  gebruikWeerCorrectie: false,

  gebruikHistorischeVerkoop: false,

  gebruikEvenementen: false,
};