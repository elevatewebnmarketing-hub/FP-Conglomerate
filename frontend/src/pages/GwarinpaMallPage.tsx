import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackButton from "@/components/PageBackButton";
import MediaAsset from "@/components/MediaAsset";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const GWARINPA_VIDEOS: { src: string; title: string }[] = [
  { src: "/videos/gwarinpa-mall/01.mp4", title: "Site approach — exterior progress" },
  { src: "/videos/gwarinpa-mall/02.mp4", title: "On-site walk-through clip" },
  { src: "/videos/gwarinpa-mall/03.mp4", title: "Structure and envelope overview" },
  { src: "/videos/gwarinpa-mall/04.mp4", title: "Construction yard and building line" },
];

const GWARINPA_IMAGES: { src: string; caption: string }[] = [
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    caption:
      "Approaching the Gwarinpa Mall site: multi-story shell with bamboo scaffolding and partial glazing along the approach.",
  },
  {
    src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1400&q=80",
    caption:
      "On-site review of exterior plaster and scaffolding: checking access and finish lines before the next envelope stage.",
  },
  {
    src: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1400&q=80",
    caption:
      "Corner perspective of the concrete frame: large shopfront openings, traditional pole scaffolding, and roofing progress.",
  },
  {
    src: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1400&q=80",
    caption:
      "Interior walk-through of the raw shell: columns, blockwork, and circulation paths ahead of MEP and finishes.",
  },
  {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    caption:
      "Facade with curtain-wall glazing underway: scale of the retail frontage against the active construction yard.",
  },
  {
    src: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1400&q=80",
    caption:
      "Perimeter pass: documenting the building line, temporary works, and staging areas on the ground plane.",
  },
  {
    src: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1400&q=80",
    caption:
      "Courtyard-facing elevation: dense scaffolding grid, open bays, and on-site materials in the foreground.",
  },
  {
    src: "https://images.unsplash.com/photo-1581092160607-ee22731a0f71?auto=format&fit=crop&w=1400&q=80",
    caption:
      "Overall massing of the L-shaped block: plastered shell, roof line, and landscaping-to-be around the slab edge.",
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
    caption:
      "Close inspection of scaffolding ties and wall plane: verifying safe access and alignment with the design intent.",
  },
];

function GwarinpaVideoCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="relative px-11 sm:px-14 md:px-16">
      <Carousel
        opts={{ loop: true, align: "center" }}
        setApi={setApi}
        className="w-full max-w-2xl mx-auto"
      >
        <CarouselContent>
          {GWARINPA_VIDEOS.map((item) => (
            <CarouselItem key={item.src}>
              <div className="border border-border overflow-hidden rounded-sm bg-muted/10">
                <div className="relative w-full max-w-md mx-auto aspect-[9/16] max-h-[min(70vh,720px)] bg-black/40">
                  <MediaAsset
                    src={item.src}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                </div>
                <p className="px-4 py-3 text-sm text-muted-foreground text-center">{item.title}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          type="button"
          className="left-1 sm:left-2 border-border bg-background/95 shadow-sm hover:bg-background"
        />
        <CarouselNext
          type="button"
          className="right-1 sm:right-2 border-border bg-background/95 shadow-sm hover:bg-background"
        />
      </Carousel>
      <p className="text-center text-xs text-muted-foreground tabular-nums mt-4" aria-live="polite">
        {current + 1} / {GWARINPA_VIDEOS.length}
      </p>
    </div>
  );
}

export default function GwarinpaMallPage() {
  return (
    <>
      <Seo
        title="Gwarinpa Mall — Site inspection"
        path="/business-units/boys-sterling/gwarinpa-mall"
        description="Site inspection documentation for Gwarinpa Mall, Abuja: structural progress, envelope and glazing, and on-the-ground oversight during construction. Boys Sterling Company Limited."
      />
      <Navbar />
      <main className="pt-32 pb-28">
        <section className="section-shell">
          <PageBackButton fallbackTo="/business-units/boys-sterling" className="mb-10" />
          <p className="eyebrow mb-5">Boys Sterling · Project documentation</p>
          <h1 className="font-editorial text-5xl md:text-7xl max-w-4xl">Gwarinpa Mall</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Field documentation from a site inspection in Gwarinpa, Abuja, for this{" "}
            <Link to="/business-units/boys-sterling" className="text-accent hover:underline">
              Boys Sterling
            </Link>{" "}
            commercial development: concrete shell, traditional scaffolding, storefront openings, and the start of
            glazed facades. The visit focused on structural and envelope readiness, safe access routes, and alignment
            with the delivery plan for a modern mall footprint.
          </p>
          <p className="mt-4 text-sm text-muted-foreground max-w-3xl">
            Group construction and technical execution capabilities are also coordinated through{" "}
            <Link to="/business-units/amgi" className="text-accent hover:underline">
              Anate Grand Empire Solutions (AGE)
            </Link>
            .
          </p>
        </section>

        <section className="section-shell py-16 md:py-20 border-t border-border/60">
          <p className="eyebrow mb-5">Video</p>
          <h2 className="font-editorial text-3xl md:text-4xl max-w-3xl mb-4">On-site footage</h2>
          <p className="text-muted-foreground max-w-2xl mb-10 md:mb-12">
            Short clips from the inspection visit—scaffolding, envelope work, and movement around the active site.
          </p>
          <GwarinpaVideoCarousel />
        </section>

        <section className="section-shell py-20 md:py-24">
          <h2 className="font-editorial text-3xl md:text-4xl mb-10 md:mb-12">Site inspection gallery</h2>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {GWARINPA_IMAGES.map((item, index) => (
              <figure
                key={item.src}
                className={`break-inside-avoid border border-border overflow-hidden ${
                  index % 3 === 1 ? "lg:translate-y-10" : ""
                }`}
              >
                <MediaAsset
                  src={item.src}
                  alt={item.caption}
                  className="w-full object-cover grayscale-[20%] dark:brightness-75 hover:grayscale-0 transition-all duration-500"
                />
                <figcaption className="px-5 py-4 text-sm text-muted-foreground">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
