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
          src: "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1200",
          alt: "Children sitting outside makeshift shelters in a displaced persons settlement in North East Nigeria, faces showing exhaustion and uncertainty.",
        },
        {
          src: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1200",
          alt: "Women and children queuing for food distribution at a humanitarian aid point in a North East Nigerian IDP camp.",
        },
        {
          src: "https://images.pexels.com/photos/8828374/pexels-photo-8828374.jpeg?auto=compress&cs=tinysrgb&w=1200",
          alt: "Rows of temporary tarp shelters stretching across open ground in a displacement camp, illustrating the scale of the North East crisis.",
        },
      ],
    },
    {
      region: "North West Nigeria",
      context:
        "Communities uprooted by armed banditry, kidnappings, and farmer-herder conflicts across Zamfara, Katsina, and Sokoto states — a crisis that has displaced hundreds of thousands with limited national attention.",
      images: [
        {
          src: "https://images.pexels.com/photos/6647003/pexels-photo-6647003.jpeg?auto=compress&cs=tinysrgb&w=1200",
          alt: "Displaced families sheltering under minimal cover in a temporary settlement in North West Nigeria, with few possessions visible.",
        },
        {
          src: "https://images.pexels.com/photos/6646958/pexels-photo-6646958.jpeg?auto=compress&cs=tinysrgb&w=1200",
          alt: "A mother and young children at an informal displacement site in North West Nigeria, surrounded by basic aid supplies.",
        },
        {
          src: "https://images.pexels.com/photos/8828370/pexels-photo-8828370.jpeg?auto=compress&cs=tinysrgb&w=1200",
          alt: "Men and women gathered at a community distribution point in a North West Nigerian IDP settlement, waiting for essentials.",
        },
      ],
    },
    {
      region: "North Central Nigeria",
      context:
        "Civilians displaced by escalating farmer-herder violence and intercommunal conflict in Benue, Plateau, and Nasarawa states — communities left with destroyed homes, loss of livelihoods, and uncertain futures.",
      images: [
        {
          src: "https://images.pexels.com/photos/6647060/pexels-photo-6647060.jpeg?auto=compress&cs=tinysrgb&w=1200",
          alt: "Displaced community members in a temporary shelter camp in North Central Nigeria, coping with the aftermath of intercommunal violence.",
        },
        {
          src: "https://images.pexels.com/photos/6646942/pexels-photo-6646942.jpeg?auto=compress&cs=tinysrgb&w=1200",
          alt: "Children attending an informal learning session at an IDP camp in North Central Nigeria, illustrating disrupted education.",
        },
        {
          src: "https://images.pexels.com/photos/8828367/pexels-photo-8828367.jpeg?auto=compress&cs=tinysrgb&w=1200",
          alt: "Wide view of a temporary settlement in North Central Nigeria, with makeshift shelters and limited infrastructure visible.",
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
