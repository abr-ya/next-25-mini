import { PageSettingsForm, UsernameForm } from "../../_copmonents/index";
import { getLastLinkPage } from "../../_data/crudLinkPage";

interface IAccountPage {
  searchParams?: Promise<{
    desiredUsername?: string;
  }>;
}

const AccountPage = async ({ searchParams }: IAccountPage) => {
  const rawParams = await searchParams;
  const { desiredUsername } = rawParams ?? {};

  console.log("desiredUsername", desiredUsername);

  const page = await getLastLinkPage();

  console.log("page", page);

  if (!page) {
    return (
      <div>
        No page found. Please create one first...
        <UsernameForm desiredUsername={desiredUsername ?? ""} />
      </div>
    );
  }

  return <PageSettingsForm page={page} />;
};

export default AccountPage;
