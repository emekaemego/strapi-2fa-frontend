import { redirect } from "next/navigation";
import { generateSecret, getSession } from "../actions";
import Setup from "./Setup";

export default async function Page() {
  const session = await getSession();

  if (!session.isLoggedIn) redirect("/auth/login");

  const totpData = await generateSecret();

  return (
    <>
      <Setup secret={totpData.secret} url={totpData.url} />
    </>
  );
}
