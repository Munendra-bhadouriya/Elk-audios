import HeroExhibition from "@/components/lifestyle-home-audio/HeroExhibition";
import Section_1 from "@/components/lifestyle-home-audio/Section_1";
import Section_2 from "@/components/lifestyle-home-audio/Section_2";
import Section_3 from "@/components/lifestyle-home-audio/Section_3";
import Section_4 from "@/components/lifestyle-home-audio/Section_4";
import Section_5 from "@/components/lifestyle-home-audio/Section_5";
import Section_6 from "@/components/lifestyle-home-audio/Section_6";
import "@/components/boutique/boutique.module.css";

export default function Page() {
    return <>
        <HeroExhibition />
        <Section_1/>
        <Section_2/>
        <Section_3/>
        <Section_4/>
        <Section_5/>
        <Section_6/>
        <section className="Section_5 studio-info bg-[#0f172a]">

            <div className="studio-info-inner">

                <div className="studio-info-grid text-white">

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
}