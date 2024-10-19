import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { SimpleTx } from "./SimpleTx";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Undegen
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <DynamicWidget variant="dropdown" />
          <SimpleTx />
        </div>
      </div>
    </main>
  );
}
