interface ILinksPage {
  params: Promise<{ url: string }>;
}

const LinksPage = async ({ params }: ILinksPage) => {
  const { url } = await params;

  return (
    <section className="pt-32">
      <h1 className="text-2xl font-bold">Page {url} ...</h1>
    </section>
  );
};

export default LinksPage;
