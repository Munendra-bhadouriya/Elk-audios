"use client";

import AgencyBlock from "./AgencyBlock";
import { useIsMobileSplitViewport } from "@/components/boutique/hooks/useIsMobileSplitViewport";

const SPLIT_IMAGE =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85";

const SCROLL_TITLE = "Elk Audios";

/** Desktop: dual split + solid + outline text tracks */
function SplitSectionDesktop() {
  return (
    <div className="boutique-split-panel__inner boutique-split-panel__inner--desktop">
      <section className="split-section" aria-label="Featured imagery">
        <div
          className="split left"
          style={{ backgroundImage: `url(${SPLIT_IMAGE})` }}
        />
        <div
          className="split right"
          style={{ backgroundImage: `url(${SPLIT_IMAGE})` }}
        />
      </section>
      <div className="text-wrapper-container">
        <div className="plain-text-wrapper">
          <div className="text-track">
            <h1 className="scroll-text scroll-text-solid" aria-hidden="true">
              {SCROLL_TITLE}
            </h1>
          </div>
        </div>
        <div className="masked-text-wrapper">
          <div className="text-track">
            <h1
              className="scroll-text masked-text-outline"
              aria-hidden="true"
            >
              {SCROLL_TITLE}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile: single image + one text track */
function SplitSectionMobile() {
  return (
    <div className="boutique-split-panel__inner boutique-split-panel__inner--mobile">
      <section
        className="split-section split-section--mobile"
        aria-label="Featured imagery"
      >
        <div
          className="split split--mobile-hero"
          style={{ backgroundImage: `url(${SPLIT_IMAGE})` }}
        />
      </section>
      <div className="text-wrapper-container text-wrapper-container--mobile">
        <div className="plain-text-wrapper plain-text-wrapper--mobile">
          <div className="text-track">
            <h1 className="scroll-text scroll-text-solid" aria-hidden="true">
              {SCROLL_TITLE}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SplitSection() {
  const isMobile = useIsMobileSplitViewport();

  return (
    <div className="scroll-section-wrapper">
      <section
        className="boutique-agency-panel scroll-section"
        aria-labelledby="boutique-agency-heading"
      >
        <AgencyBlock />
      </section>

      <section className="boutique-split-panel scroll-section sticky-container">
        {isMobile ? <SplitSectionMobile /> : <SplitSectionDesktop />}
      </section>
    </div>
  );
}
