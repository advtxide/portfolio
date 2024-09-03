import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("remote-addr");

  return new Response(JSON.stringify({ ip }, null, 2));
};
