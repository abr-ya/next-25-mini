import Image from "next/image";
import { MapPinned } from "lucide-react";

import { getLinkPageByUrl } from "@linklist/_data/crudLinkPage";

interface ILinksPage {
  params: Promise<{ url: string }>;
}

const LinksPage = async ({ params }: ILinksPage) => {
  const { url } = await params;
  const page = await getLinkPageByUrl(url);

  if (!page) {
    return (
      <section className="pt-4">
        <h1 className="text-2xl font-bold">Page not found</h1>
      </section>
    );
  }

  return (
    <div className="bg-blue-950 text-white min-h-[calc(100vh-112px)]">
      <div
        className="h-[360px] bg-gray-400 bg-cover bg-center"
        style={
          page.bgType === "color" ? { backgroundColor: page.bgColor } : { backgroundImage: `url(${page.bgImage})` }
        }
      ></div>
      <div className="aspect-square w-36 h-36 mx-auto relative -top-18 -mb-16">
        {page.userImage ? (
          <Image
            className="rounded-full w-full h-full object-cover"
            src={page.userImage}
            alt="avatar"
            width={256}
            height={256}
          />
        ) : (
          <>no avatar(</>
        )}
      </div>
      <h2 className="text-2xl text-center mb-1">{page.displayName}</h2>
      <h3 className="text-md flex gap-2 justify-center items-center text-white/70">
        <MapPinned />
        <span>{page.location}</span>
      </h3>
      <div className="max-w-xs mx-auto text-center my-2">
        <p>{page.bio}</p>
      </div>
      <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6 p-4 px-8">
        todo: links here
        <ul>
          <li>111</li>
          <li>222</li>
          <li>333</li>
          <li>444</li>
          <li>555</li>
          <li>666</li>
        </ul>
      </div>
      <div className="flex gap-2 justify-center mt-4 pb-4">todo: social links here</div>
    </div>
  );
};

export default LinksPage;
