import { Authorization } from "@/widgets/autoriaztion";

export default function AuthPage() {
  return (
    <section
      id="authorization"
      className="flex flex-col items-center justify-center w-full h-full py-10 gap-8"
    >
      <Authorization />
    </section>
  );
}
