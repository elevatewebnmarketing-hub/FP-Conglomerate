/**
 * Copy and external stock image set for the Mogadishu Initiative Humanitarian Programs page.
 * URLs are intentionally fixed (non-random) to reduce broken-image risk.
 */

export const MIA_UNIT_ID = "mogadishu-initiative" as const;

export const humanitarianProgramsContent = {
  hero: {
    headline: "Humanitarian Programs That Restore Dignity",
    subtext:
      "Honest relief work in the field, open communication with communities, and delivery that keeps people at the center. We aim to meet real needs across Nigeria in line with FP Conglomerate standards for trust and accountability.",
    imageSrc:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
    imageAlt:
      "Humanitarian field context: community support and coordinated outreach in Nigeria.",
    exploreWorkHref: "#kogi-outreach",
    partnerHref: "/contact?intent=partnership",
  },
  idp: {
    sectionEyebrow: "IDP camp awareness",
    title: "Supporting displaced communities across Nigeria",
    sectionIntro:
      "We talk about life in IDP camps and informal settlements with accuracy and restraint—context first, people at the center, and no sensational headlines.",
    paragraphs: [
      "Displacement affects households across Nigeria: strained infrastructure, interrupted schooling, and day-to-day uncertainty. Mogadishu Initiative Response focuses on awareness and practical support that keeps dignity intact.",
      "We document conditions carefully, collaborate where it strengthens outcomes, and channel attention toward shelter, essentials, and steadier footing—not performative crisis imagery.",
    ],
    /** Featured image for the two-column awareness block (wide, documentary tone). */
    featureImageSrc:
      "https://images.unsplash.com/photo-1469571486292-b53601020acb?auto=format&fit=crop&w=1600&q=80",
    featureImageAlt:
      "Documentary view of pathways and clustered temporary shelters, illustrating scale and conditions in an IDP context.",
    cards: [
      { title: "Limited access to basic needs", description: "Water, nutrition, and essentials can remain inconsistent without sustained support." },
      { title: "Disrupted education", description: "Children and young adults often face interrupted learning and long commutes to schools." },
      { title: "Uncertain future", description: "Households navigate resettlement questions while meeting immediate safety and health needs." },
    ],
  },
  /** Teaser on Humanitarian Programs page linking to the standalone IDP camp page. */
  idpTeaser: {
    title: "IDP camp awareness",
    body:
      "Grounded context on camps and informal settlements, respectful language, and a clear path to the support we can help coordinate.",
    href: "/business-units/mogadishu-initiative/idp-camps",
    linkLabel: "Open the IDP camp page",
  },
  kogi: {
    id: "kogi-outreach",
    title: "Kogi Special Arms Blanket Outreach",
    subtitle:
      "On-the-ground distribution in Kogi State—blankets, essentials, and face-to-face engagement that respects every household.",
    body:
      "This program meets people where they live: coordinated handoffs, clear accountability with local contacts, and distributions designed to minimize disruption. We focus on warmth, core supplies, and steady communication—not optics.",
    galleryNote:
      "Field documentation from outreach days in Kogi—shared to show real delivery, not sensationalize hardship.",
    gallery: [
      { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80", alt: "Outdoor distribution: outreach team and community members gathered on unpaved ground near modest structures." },
      { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80", alt: "Volunteers and residents during a supply handoff beside weathered corrugated shelters." },
      { src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80", alt: "Aid items being shared with seated community members in an informal settlement setting." },
      { src: "https://images.unsplash.com/photo-1469571486292-b53601020acb?auto=format&fit=crop&w=1400&q=80", alt: "Team members distributing supplies from bags during a community visit." },
      { src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80", alt: "Residents receiving support during an outdoor outreach session." },
      { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80", alt: "Conversation and coordination between outreach workers and local community members." },
      { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80", alt: "Distribution moment with supplies passed hand to hand in a camp-like environment." },
      { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80", alt: "Volunteers engaging with women and children during blanket and essentials outreach." },
      { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80", alt: "Field team members preparing to hand over packaged essentials to residents." },
      { src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80", alt: "Community gathering during relief distribution between makeshift buildings." },
      { src: "https://images.unsplash.com/photo-1469571486292-b53601020acb?auto=format&fit=crop&w=1400&q=80", alt: "Outreach workers and residents in discussion during a distribution pause." },
      { src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80", alt: "Supplies carried through a narrow outdoor lane between shelters." },
      { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80", alt: "Residents lining up or receiving items during a structured distribution." },
      { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80", alt: "Elderly and younger community members present during an essentials handoff." },
      { src: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1400", alt: "Wider view of outreach activity across a dusty common area." },
      { src: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1400", alt: "Volunteer leaning to pass supplies to a seated community member." },
      { src: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1400", alt: "Closing moments of outreach with residents and field team still engaged." },
    ],
    impact: [
      { label: "Location", value: "Kogi State" },
      { label: "Focus", value: "Vulnerable communities" },
      { label: "Support", value: "Blankets & essentials" },
    ],
  },
  impactPillars: {
    title: "How We Create Impact",
    items: [
      {
        title: "Community Outreach",
        description: "On-the-ground distributions and listening sessions that meet people where they are.",
      },
      {
        title: "Awareness Initiatives",
        description: "Straight talk on displacement and justice, without exploitation or noise.",
      },
      {
        title: "Collaborative Efforts",
        description: "Partnerships with aligned organizations so we can reach further and keep standards high.",
      },
    ],
  },
  /** Horizontal strip of field moments (documentary tone). */
  moments: [
    { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80", alt: "Settlement pathways between temporary shelters in an IDP context." },
    { src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80", alt: "Elevated view across temporary shelters in a camp setting." },
    { src: "https://images.unsplash.com/photo-1469571486292-b53601020acb?auto=format&fit=crop&w=1200&q=80", alt: "Volunteers preparing outreach supplies." },
    { src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80", alt: "Organized shelter rows and paths visible across a camp area." },
    { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80", alt: "Community gathering on open ground in a settlement context." },
    { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80", alt: "Coordinated distribution moment during Kogi outreach." },
  ],
  cta: {
    title: "Be Part of the Impact",
    paragraph:
      "Whether you represent an organization or want to explore a responsible collaboration, reach out. We will respond with clarity and care.",
    partnerHref: "/contact?intent=partnership",
    contactHref: "/contact",
  },
} as const;
