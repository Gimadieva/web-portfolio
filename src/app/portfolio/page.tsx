import { Contacts } from "@/widgets/contacts";
import { Portfolio } from "@/widgets/portfolio";

export default function PortfolioPage() {
  return (
    <>
      <section
        id="portfolio"
        className="flex flex-col items-center justify-center w-full py-10 gap-8"
      >
        <Portfolio />
      </section>
      <section
        id="contacts"
        className="flex flex-col items-center justify-center w-full py-10 gap-8"
      >
        <Contacts />
      </section>
    </>
  );
}
