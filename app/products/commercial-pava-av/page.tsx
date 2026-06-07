"use client";

const HERO =
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=2000&q=90";

const IMG1 =
    "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1200";

const IMG2 =
    "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80&w=1200";

const IMG3 =
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1200";

const IMG4 =
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200";

const IMG5 =
    "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?q=80&w=1200";

const IMG6 =
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1200";

export default function Page() {
    return (
        <>
            <style jsx global>{`

*{
box-sizing:border-box;
}

body{
margin:0;
background:rgb(0,0,0);
color:white;
font-family:sans-serif;
}

/* HERO */

.hero{
height:100vh;
position:relative;
overflow:hidden;
}

.hero img{
width:100%;
height:100%;
object-fit:cover;
filter:brightness(.55);
}

.hero-text{
position:absolute;
inset:0;
display:flex;
text-align: center;
align-items:center;
justify-content:center;
font-size:clamp(60px,8vw,120px);
font-weight:700;
letter-spacing:.1em;
}

/* ================= FIRST SECTION ================= */

.studio-section{
padding:100px 6vw;
width:100%;
overflow:hidden;
}

/* GRID */

.studio-grid{
display:grid;
grid-template-columns:1fr 1.2fr;
gap:40px;

width:100%;
max-width:1400px;
margin:auto;
}

/* image grid */

.image-grid{
display:grid;
grid-template-columns:1fr 1fr;
gap:25px;

min-width:0;
}

.image-card{
border-radius:18px;
overflow:hidden;
border:1px dashed rgba(255,255,255,.35);
}

.image-card img{
width:100%;
height:100%;
object-fit:cover;
display:block;
}

/* image sizes */

.image-small{
height:260px;
}

.image-wide{
grid-column:span 2;
height:340px;
}

/* text block */

.text-block{
border:1px dashed rgba(255,255,255,.35);
border-radius:18px;

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;

text-align:center;

padding:70px 50px;

min-width:0;
}

/* small text */

.text-small{
letter-spacing:.45em;
font-size:12px;
opacity:.7;

margin-bottom:25px;
}

/* main heading */

.text-block h1{
font-size:clamp(48px,6vw,110px);

line-height:.9;
margin:0;

word-break:break-word;
overflow-wrap:anywhere;
}

/* italic words */

.italic{
font-style:italic;
font-weight:300;
}

/* CTA */

.contact{
margin-top:35px;

letter-spacing:.25em;
font-size:14px;

opacity:.85;
cursor:pointer;
}

/* ================= RESPONSIVE ================= */

@media(max-width:1000px){

.studio-grid{
grid-template-columns:1fr;
gap:50px;
}

.image-wide{
height:300px;
}

.text-block{
padding:60px 35px;
}

.text-block h1{
font-size:clamp(40px,8vw,70px);
}

}

@media(max-width:600px){

.studio-section{
padding:70px 6vw;
}

.image-small{
height:220px;
}

.image-wide{
height:260px;
}

.text-block{
padding:50px 25px;
}

.text-small{
letter-spacing:.3em;
}

}
/* ================= SECOND SECTION 2nd grid================= */

.studio-services-section{
padding:80px 6vw 140px;
}

.studio-services-grid{
display:grid;
grid-template-columns:1fr 1fr 1.4fr;
grid-template-rows:320px 320px;
gap:25px;
}

.card{
border-radius:18px;
overflow:hidden;
border:1px dashed rgba(255,255,255,.35);
background:#111;
display:flex;
align-items:center;
justify-content:center;
}

.card img{
width:100%;
height:100%;
object-fit:cover;
}

/* tall image */

.tall{
grid-row:span 2;
}

/* right large image */

.big{
grid-row:span 2;
}

/* services text */

.services{
text-align:center;
padding:40px;
flex-direction:column;
}

.services-small{
letter-spacing:.4em;
font-size:12px;
opacity:.7;
margin-bottom:25px;
}

.services h3{
font-size:22px;
line-height:1.6;
letter-spacing:.05em;
}
.team-text h3{
        font-size: 1.5rem;
        font-style: italic;
        margin: 0;
        text-align: center;
}

/* ================= MOBILE ================= */

@media(max-width:1000px){

.studio-grid{
grid-template-columns:1fr;
}

.studio-services-grid{
grid-template-columns:1fr;
grid-template-rows:auto;
}

.tall,
.big{
grid-row:auto;
height:320px;
}
@media(max-width:1000px){

.studio-services-grid{
  grid-template-columns:1fr 1fr;  /* only 2 columns */
  grid-template-rows:auto auto auto;
  gap:12px;
}

/* LEFT TALL stays spanning */
.tall{
  grid-row:span 2;
  height:100%;
}

/* SERVICES stays top-right */
.services{
  grid-column:2;
  grid-row:1;
}

/* SMALL IMAGE below services */
.studio-services-grid .card:not(.tall):not(.big):not(.services){
  grid-column:2;
  grid-row:2;
}

/* BIG IMAGE moves below everything */
.big{
  grid-column:1 / -1;  /* full width */
  grid-row:3;
  height:260px;
}

/* adjust heights */

.studio-services-grid{
  grid-auto-rows:160px;
}

.services{
  padding:20px;
}

.services h3{
  font-size:9px;
  line-height:1.4;
}

.services-small{
  font-size:10px;
  letter-spacing:.25em;
}

}

}

      `}</style>

            {/* HERO */}

            <section className="hero">
                <img src={HERO} />
                <div className="hero-text">
                    ELK AUDIOS
                </div>
            </section>

            {/* SECTION 1 */}

            <section className="studio-section">

                <div className="studio-grid">

                    {/* left image layout */}

                    <div className="image-grid">

                        <div className="image-card image-small">
                            <img src={IMG1} />
                        </div>

                        <div className="image-card image-small">
                            <img src={IMG2} />
                        </div>

                        <div className="image-card image-wide">
                            <img src={IMG3} />
                        </div>

                    </div>

                    {/* text block */}

                    <div className="text-block">

                        <div className="text-small">
                            THE HILLS ARE ALIVE WITH
                        </div>

                        <h1>
                            <span className="italic">the</span><br />
                            SOUND <span className="italic">of</span><br />
                            OUR STUDIO
                        </h1>

                        <div className="contact">
                            CONTACT US →
                        </div>

                    </div>

                </div>

            </section>

            {/* SECTION 2 */}

            <section className="studio-services-section">

                <div className="studio-services-grid">

                    {/* left tall image */}

                    <div className="card tall">
                        <img src={IMG4} />
                    </div>

                    {/* services text */}

                    <div className="card services">

                        <p className="services-small">SERVICES</p>

                        <h3>
                            SOUND DESIGN<br />
                            MUSIC COMPOSITION<br />
                            VOICE OVER CASTING<br />
                            MUSIC SEARCHES<br />
                            LICENSING + SUPERVISION<br />
                            VO RECORDING + ADR
                        </h3>

                    </div>

                    {/* right big image */}

                    <div className="card big">
                        <img src={IMG5} />
                    </div>

                    {/* bottom center image */}

                    <div className="card">
                        <img src={IMG6} />
                    </div>

                </div>

            </section>

            <section className="custom-flex-grid">

  {/* TOP ROW */}
  <div className="row top-row">

    <div className="box main-content">
      <img src={IMG4} />
    </div>

    <div className="box sidebar">
      <div className="services-inner">
        <p>SERVICES</p>
        <h3>
          SOUND DESIGN<br />
          MUSIC COMPOSITION<br />
          VOICE OVER CASTING<br />
          MUSIC SEARCHES<br />
          LICENSING + SUPERVISION<br />
          VO RECORDING + ADR
        </h3>
      </div>
    </div>

  </div>

  {/* BOTTOM ROW */}
  <div className="row bottom-row">

    <div className="box twin">
      <img src={IMG5} />
    </div>

    <div className="box twin">
      <img src={IMG5} />
    </div>

  </div>

</section>

            <section className="studio-info">

  <div className="studio-info-inner">

    <div className="studio-info-grid">

      <h3>AN ENTERTAINMENT PRODUCTION STUDIO</h3>
      <h3>
      COMPANY<span> SONAR MUSIC </span>
LOCATION<span> DISNEY STUDIOS </span>
CATEGORIES FILM,<span> ADVERTISING, TELEVISION </span>
CITY<span> SYDNEY, AU </span>
SERVICES<span> MUSIC COMPOSITION & SOUND DESIGN </span>
      </h3>

    </div>

  </div>

</section>

        </>
    );
}