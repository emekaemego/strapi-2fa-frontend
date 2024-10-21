import { redirect } from "next/navigation";
import { getSession, checkTotpStatus } from "../auth/actions";

export default async function Page() {
  const session = await getSession();

  if (!session.isLoggedIn) redirect("/");

  const totpEnabled = (await checkTotpStatus())?.enabled ?? false;

  return (
    <>
      <section>
        <h2 className="py-8 text-3xl font-bold text-center">Dashboard</h2>
        <div className="text-center">
          {!totpEnabled && (
            <a className="text-lg font-semibold" href="/auth/app-setup">
              Setup Authenticator App
            </a>
          )}

          {totpEnabled && <p>Authenticator app enabled</p>}
        </div>
      </section>
    </>
  );
}
