export const telOpties = {
  hardlopers: [0, 1, 2, 3, 4, 5, 6, 7],

  middenlopers: [0, 1, 2, 3],

  zachtlopers: [0, 1],

  banaan: [0, 1, 2],

  specials: [0, 2, 4, 6, 8, 10],

  overig: [0, 1, 2],
} as const;

export function optiesVoorProduct(productId: string, buffer: number): number[] {
  switch (productId) {
    case "banaan":
      return [...telOpties.banaan];

    case "specials":
      return [...telOpties.specials];

    default:
      if (buffer >= 7) return [...telOpties.hardlopers];
      if (buffer >= 2) return [...telOpties.middenlopers];
      if (buffer === 1) return [...telOpties.zachtlopers];

      return [...telOpties.overig];
  }
}