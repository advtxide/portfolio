import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const ip = (
    request.headers.get("x-forwarded-for") || request.headers.get("remote-addr")
  )?.split(",")[0];

  return new Response(JSON.stringify({ ip }), { status: 200 });
};
