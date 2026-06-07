"use client";

import styles from "./boutique.module.css";

const IMG =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=85";

export default function ParallaxGallery() {
  return (
    <section className="parallax-gallery relative pt-[17vh]">

      {/* HEADING */}
      <h2 className={styles.splitHeading}>
        Believe
        <span>Believe</span>
        <span>Believe</span>
        <span>in yourself</span>
      </h2>

      {/* GALLERY */}
      <div className={styles.galleryRow}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={styles.parallaxWindow}
            data-index={i}
          >
            <img
              src={IMG}
              className={`${styles.parallaxImg} parallax-img`}
              alt=""
            />
          </div>
        ))}
      </div>

    </section>
  );
}