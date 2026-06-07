"use client";

export default function ScrollText() {
  return (
    <div className="text-wrapper-container">

      {/* LEFT (SOLID) */}
      <div className="plain-text-wrapper">
        <div className="text-track">
          <h1 className="scroll-text scroll-text-solid">
            Elk Audios&nbsp;&nbsp;Elk Audios&nbsp;&nbsp;Elk Audios
          </h1>
        </div>
      </div>

      {/* RIGHT (OUTLINE) */}
      <div className="masked-text-wrapper">
        <div className="text-track">
          <h1 className="scroll-text masked-text-outline">
            Elk Audios&nbsp;&nbsp;Elk Audios&nbsp;&nbsp;Elk Audios
          </h1>
        </div>
      </div>

    </div>
  );
}