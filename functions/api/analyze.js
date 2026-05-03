// Cloudflare Pages Function: POST /api/analyze
// Equivalent of the original Netlify function, rewritten for the
// Cloudflare Workers / Pages Functions runtime (Web Standards `fetch`).
//
// Env vars (set in the Cloudflare Pages dashboard → Settings → Environment variables):
//   ANTHROPIC_API_KEY  (required, mark as "Secret")

export async function onRequestPost({ request, env }) {
  if (!env.ANTHROPIC_API_KEY) {
    return json({ error: "ANTHROPIC_API_KEY not configured" }, 500);
  }

  let prompt;
  try {
    const body = await request.json();
    prompt = body?.prompt;
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  if (!prompt) {
    return json({ error: "Missing prompt" }, 400);
  }

  try {
    const apiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 900,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      return json({ error: `Anthropic API error: ${errText}` }, apiRes.status);
    }

    const data = await apiRes.json();
    return json({ text: data?.content?.[0]?.text || "" }, 200);
  } catch (err) {
    return json({ error: err.message || "Unknown error" }, 500);
  }
}

// Reject other methods cleanly
export const onRequest = ({ request }) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
