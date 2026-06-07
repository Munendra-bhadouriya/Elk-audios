"use client";

export default function LayoutSection() {
  return (
    <section className="layout-section text-white">
      <div className="layout-left">
        <div className="layout-left-top" />
        <div className="layout-left-bottom">
          <div className="layout-bottom-left">
            <div className="layout-label-salt">Salt</div>
            <div className="layout-bottom-right" />
          </div>
        </div>
      </div>

      <div className="layout-right">
        <div className="layout-label-architecture">Architecture</div>
        <div className="layout-label-add">+</div>
        <div className="layout-label-interiors">Interiors</div>
      </div>
    </section>
  );
}
