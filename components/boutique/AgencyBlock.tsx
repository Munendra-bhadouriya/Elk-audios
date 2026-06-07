import Link from "next/link";
export default function AgencyBlock() {
  return (
    <div className="boutique-agency-block">
      <h2 id="boutique-agency-heading" className="boutique-agency-block__heading">
        Agency
      </h2>
      <p className="boutique-agency-block__p text-justify">
        <strong>OAKS GROUP SA</strong> is a Swiss real estate investment company
        specializing in <strong>real estate development</strong> in{" "}
        <strong>Geneva</strong> and the <strong>canton of Vaud</strong>. We excel
        in acquiring properties for development, project management, and
        brokerage.
      </p>
      <p className="boutique-agency-block__p text-justify">
        As a committed <strong>real estate developer</strong>, our mission is to
        lead eco-responsible and sustainable projects, integrating innovation to
        meet the needs of the market and our clients.
      </p>
      <Link href="/about" className="boutique-agency-block__cta inline-block font-semibold hover:underline">
        → Learn more
      </Link>
    </div>
  );
}
