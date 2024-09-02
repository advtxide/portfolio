import type { APIRoute } from "astro";
import { z } from "zod";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const schema = z.object({
    name: z.string(),
    email: z.string(),
    message: z.string(),
  });
  const validation = schema.safeParse(data);

  if (!validation.success) {
    return new Response(
      JSON.stringify({
        message: "Invalid data",
      }),
      { status: 400 }
    );
  }

  return new Response(
    JSON.stringify({
      message: "Message sent!!",
    }),
    { status: 200 }
  );
};
