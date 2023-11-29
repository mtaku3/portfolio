import { env } from "@/env.mjs";
import { isUserAuthorized } from "@tinacms/auth";

export async function IsAuthorized(token?: string | null): Promise<boolean> {
  // Check the environmen
  const isLocal = env.NODE_ENV === "development";

  // Check the token
  // This token should only be known to this route handler and the CMS
  const isAuthorizedRes =
    isLocal ||
    typeof (await isUserAuthorized({
      token: `Bearer ${token}`,
      clientID: env.NEXT_PUBLIC_TINACMS_CLIENTID,
    })) !== "undefined";

  return isAuthorizedRes;
}
