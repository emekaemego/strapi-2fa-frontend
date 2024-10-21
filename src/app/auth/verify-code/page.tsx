"use client";
import { useFormState } from "react-dom";
import { verifyCode } from "../actions";
import { useSearchParams } from "next/navigation";

const initialState = {
  message: "",
};

export default function VerifyCodePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("e") || "";
  const verifyType = searchParams.get("vt") || "";
  const typeTitle = verifyType === "otp" ? "OTP" : "Authenticator app";

  const [state, formAction] = useFormState(verifyCode, initialState);

  return (
    <>
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text- text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Enter {typeTitle} Code
              </h1>
              <form className="space-y-4 md:space-y-6" action={formAction}>
                {state?.message && (
                  <p className="text-sm text-center pt-1 text-red-500">
                    {state.message}
                  </p>
                )}
                <input type="hidden" name="email" value={email} />
                <input type="hidden" name="type" value={verifyType} />
                <div>
                  <input
                    type="text"
                    name="code"
                    autoComplete="off"
                    className="bg-gray-50 text-center border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5"
                    placeholder="Code"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 text-center"
                >
                  Verify
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
