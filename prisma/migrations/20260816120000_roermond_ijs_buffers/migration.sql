DO $$
BEGIN
  IF to_regclass('public."ProductBuffer"') IS NULL THEN
    RETURN;
  END IF;

  EXECUTE $migration$
    UPDATE "ProductBuffer" AS pb
    SET "buffer" = -1
    WHERE EXISTS (
      SELECT 1
      FROM "Vestiging" AS v
      JOIN "Product" AS p
        ON p.id = pb."productId"
      JOIN "ProductCategorie" AS pc
        ON pc.id = p."categorieId"
      WHERE v.id = pb."vestigingId"
        AND LOWER(v."naam") = 'roermond'
        AND LOWER(pc."naam") = 'ijs'
    )
  $migration$;
END
$$;