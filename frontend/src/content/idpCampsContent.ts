/**
 * Standalone IDP camp awareness page. Shares narrative cards with humanitarianProgramsContent.idp.
 * Gallery imagery restored from `/images/mia/humanitarian/idp-*.png`.
 */

import { humanitarianProgramsContent, MIA_UNIT_ID } from "./humanitarianProgramsContent";

export { MIA_UNIT_ID };

/** Core copy and cards imported from shared humanitarian content. */
export const idpCampsBody = humanitarianProgramsContent.idp;

export const idpCampsPageContent = {
  hero: {
    headline: "IDP Camp Awareness Across Nigeria",
    subtext:
      "Awareness begins with context: conditions in camps and informal settlements, what communities navigate every day, and how we communicate without turning hardship into spectacle.",
    imageSrc: "/images/mia/humanitarian/idp-06.png",
    imageAlt:
      "Wide elevated view of many temporary shelters in an IDP settlement, illustrating the scale of displacement.",
  },
  /** Regional IDP galleries organized by geopolitical zone. */
  regionalGalleries: [
    {
      region: "North East Nigeria",
      context:
        "Displacement driven by over a decade of insurgency across Borno, Yobe, and Adamawa states — Nigeria's most prolonged humanitarian emergency, with millions still living in camps and host communities.",
      images: [
        {
          src: "/images/mia/humanitarian/idp-01.png",
          alt: "Wide elevated view of clustered temporary shelters across dry ground in a North East Nigerian IDP settlement.",
        },
        {
          src: "/images/mia/humanitarian/idp-02.png",
          alt: "Rows of blue and white tarp shelters along a path in a North East Nigeria displacement camp.",
        },
        {
          src: "/images/mia/humanitarian/idp-03.png",
          alt: "White canvas shelters on open ground in a North East Nigeria IDP settlement, with trees and structures visible beyond.",
        },
      ],
    },
    {
      region: "North West Nigeria",
      context:
        "Communities uprooted by armed banditry, kidnappings, and farmer-herder conflicts across Zamfara, Katsina, and Sokoto states — a crisis that has displaced hundreds of thousands with limited national attention.",
      images: [
        {
          src: "/images/mia/humanitarian/idp-04.png",
          alt: "Makeshift shelters and open ground between structures in a North West Nigeria IDP settlement.",
        },
        {
          src: "/images/mia/humanitarian/idp-05.png",
          alt: "Dense rows of temporary dwellings stretching toward the horizon in a North West Nigeria displacement camp.",
        },
        {
          src: "/images/mia/humanitarian/idp-06.png",
          alt: "Elevated perspective across many temporary shelters on sandy terrain in a North West Nigeria IDP camp.",
        },
      ],
    },
    {
      region: "North Central Nigeria",
      context:
        "Civilians displaced by escalating farmer-herder violence and intercommunal conflict in Benue, Plateau, and Nasarawa states — communities left with destroyed homes, lost livelihoods, and uncertain futures.",
      images: [
        {
          src: "/images/mia/humanitarian/idp-07.png",
          alt: "Organised rows of shelters with narrow paths and scattered figures in a North Central Nigeria IDP settlement.",
        },
        {
          src: "/images/mia/humanitarian/idp-08.png",
          alt: "Young people gathered on open ground near low buildings in a North Central Nigeria displacement camp.",
        },
        {
          src: "/images/mia/humanitarian/idp-09.png",
          alt: "Wide view of shelter materials and terrain at the edge of a North Central Nigeria IDP settlement.",
        },
      ],
    },
  ],
  gallerySection: {
    title: "Displacement across Nigeria's North",
    description:
      "Field perspectives from three geopolitical zones — North East, North West, and North Central — where conflict, banditry, and intercommunal violence have uprooted hundreds of thousands of Nigerians. Shared to inform partners and the public, not to sensationalize.",
  },
  cta: {
    title: "Support responsible relief",
    paragraph:
      "Partner with Mogadishu Initiative Response to extend essentials, awareness, and dignity-first engagement.",
    partnerHref: "/contact?intent=partnership",
    contactHref: "/contact",
    backToProgramsHref: "/business-units/mogadishu-initiative/humanitarian-programs",
  },
} as const;
