import { ButtonLink } from "../../_components";
import { HeroForm } from "../_copmonents/index";

const LandingPage = () => (
  <section className="pt-32">
    <div className="max-w-md mb-4">
      <h1 className="text-6xl font-bold">
        Your one link
        <br />
        for everything
      </h1>
      <h2 className="text-gray-500 text-xl mt-4">
        Share your links, social profiles, contact info and more on one page
      </h2>
    </div>
    <HeroForm />
    <div className="mt-4 text-gray-500">
      or... <ButtonLink variant="outline" to="/linklist/account" text="Go to Account Page" />
    </div>
  </section>
);

export default LandingPage;
