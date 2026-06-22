/**
 * Calculateur de tarifs de taxi.
 *
 * Règles tarifaires :
 * - Tarif A (1,06 €/km) : Zone urbaine, Lundi-Samedi 10h-17h
 * - Tarif B (1,32 €/km) : Zone urbaine (Lun-Sam 17h-10h, Dim 7h-24h, Jours fériés),
 *                         Zone suburbaine (Lun-Sam 7h-19h)
 * - Tarif C (1,58 €/km) : Zone urbaine (Dim y compris fériés 0h-7h),
 *                         Zone suburbaine (Lun-Sam 19h-7h, Dim y compris fériés 0h-24h),
 *                         Hors zone (toujours)
 * - Prise en charge : 2,60 € pour toutes les courses
 */


/**
 * Utilisation de "Object.freeze()" pour déclarer l'enum.
 * Cette méthode permetant de créer un objet immuable (ne pouvant être modifié).
 */
export const Zone = Object.freeze({
  URBAINE: 'URBAINE',
  SUBURBAINE: 'SUBURBAINE',
  HORS_ZONE: 'HORS_ZONE',
});

export const PRISE_EN_CHARGE = 2.60;
export const TARIF_A = 1.06;
export const TARIF_B = 1.32;
export const TARIF_C = 1.58;

/**
 * Calcule le prix d'une course de taxi.
 *
 * @param {number} jourSemaine - Jour de la semaine (0 = dimanche, 1 = lundi, ..., 6 = samedi)
 * @param {number} hour        - Heure de la course (0-23)
 * @param {string} zone        - Zone de la course (Zone.URBAINE | Zone.SUBURBAINE | Zone.HORS_ZONE)
 * @param {number} distance    - Distance de la course en km
 * @param {boolean} estFerie   - True si la course a lieu un jour férié
 * @returns {number} Le prix total de la course en euros.
 */


export function calculateFare(jourSemaine, hour, zone, distance, estFerie) {

  let tarif;

  const dimanche = jourSemaine === 0;
  const semaine = jourSemaine >= 1 && jourSemaine <= 6;

 // Hors zone = toujours Tarif C
  if (zone === Zone.HORS_ZONE) {
    tarif = TARIF_C;
  }

  // Zone urbaine
  else if (zone === Zone.URBAINE) {

    // Dimanche 00h-07h = Tarif C
    if (dimanche && hour < 7) {
      tarif = TARIF_C;
    }

    // Jours fériés = Tarif B (sauf dimanche 0h-7h déjà traité)
    else if (estFerie) {
      tarif = TARIF_B;
    }

    // Lundi-Samedi 10h-17h = Tarif A
    else if (semaine && hour >= 10 && hour < 17) {
      tarif = TARIF_A;
    }

    // Sinon = Tarif B
    else {
      tarif = TARIF_B;
    }
  }

  // Zone suburbaine
  else if (zone === Zone.SUBURBAINE) {

    // Dimanche toute la journée = Tarif C
    if (dimanche) {
      tarif = TARIF_C;
    }

    // Jour férié = Tarif C
    else if (estFerie) {
      tarif = TARIF_C;
    }

    // Lundi-Samedi 07h-19h = Tarif B
    else if (semaine && hour >= 7 && hour < 19) {
      tarif = TARIF_B;
    }

    // Sinon = Tarif C
    else {
      tarif = TARIF_C;
    }
  }

  // Calcul final
  return PRISE_EN_CHARGE + (distance * tarif);
}
