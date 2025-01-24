import { Contacts } from "@/widgets/contacts";
import { Hero } from "@/widgets/main/hero";
import { Info } from "@/widgets/main/info";
import { ListPortfolio } from "@/widgets/main/portfolio";
import { Skills } from "@/widgets/main/skills";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center w-full p-6">
        <Hero />
      </section>
      <section id='skills'  className="flex flex-col items-center justify-center w-full py-10 gap-8">
        <Skills />
      </section>
      <section id='portfolio' className="flex flex-col items-center justify-center w-full py-10 gap-8">
        <ListPortfolio />
      </section>
      <section id='info'  className="flex flex-col items-center justify-center w-full py-10 gap-8">
        <Info />
      </section>
      <section id='contacts' className="flex flex-col items-center justify-center w-full py-10 gap-8">
        <Contacts/>
      </section>
    </>
  );
}
