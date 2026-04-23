/**
 * Standalone IDP camp awareness page. Shares narrative cards with humanitarianProgramsContent.idp.
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
    imageSrc:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
    imageAlt:
      "Wide elevated view of many temporary shelters in an IDP settlement, illustrating the scale of displacement.",
  },
  /** Full-width grid below the main narrative (documentary IDP imagery). */
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80",
      alt: "Wide elevated view of clustered temporary shelters across dry ground in a settlement.",
    },
    {
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
      alt: "Rows of blue and white tarp shelters along a path with a green hillside in the background.",
    },
    {
      src: "https://images.unsplash.com/photo-1469571486292-b53601020acb?auto=format&fit=crop&w=1400&q=80",
      alt: "White canvas shelters on open ground with trees and structures visible beyond the camp.",
    },
    {
      src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80",
      alt: "Makeshift shelters and open ground between structures in a densely settled camp area.",
    },
    {
      src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80",
      alt: "Dense rows of temporary dwellings stretching toward the horizon under a bright sky.",
    },
    {
      src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80",
      alt: "Elevated perspective across many white temporary shelters on sandy terrain.",
    },
    {
      src: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1400",
      alt: "Organized rows of light-colored shelters with narrow paths and scattered figures in the distance.",
    },
    {
      src: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1400",
      alt: "Young people gathered on open ground near low buildings with blue roofs in a camp setting.",
    },
    {
      src: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1400",
      alt: "Wide view of shelter materials and terrain at the edge of a settlement.",
    },
  ],
  gallerySection: {
    title: "Field perspectives",
    description:
      "Nine documentary frames from settlements referenced in our awareness work—shared to inform partners and the public, not to sensationalize.",
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
