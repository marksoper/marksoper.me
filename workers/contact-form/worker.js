export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "https://marksoper.me",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405);
    }

    try {
      const formData = await request.formData();
      const name = formData.get("name")?.trim();
      const email = formData.get("email")?.trim();
      const message = formData.get("message")?.trim();
      const turnstileToken = formData.get("cf-turnstile-response");

      // Validate required fields
      if (!name || !email || !message) {
        return jsonResponse({ error: "All fields are required" }, 400);
      }

      // Validate Turnstile token
      const turnstileValid = await verifyTurnstile(turnstileToken, request.headers.get("CF-Connecting-IP"), env.TURNSTILE_SECRET_KEY);
      if (!turnstileValid) {
        return jsonResponse({ error: "Bot verification failed" }, 403);
      }

      // Collect request metadata
      const metadata = {
        ip: request.headers.get("CF-Connecting-IP") || "unknown",
        userAgent: request.headers.get("User-Agent") || "unknown",
        country: request.headers.get("CF-IPCountry") || "unknown",
        city: request.cf?.city || "unknown",
        region: request.cf?.region || "unknown",
        referer: request.headers.get("Referer") || "unknown",
        timestamp: new Date().toISOString(),
      };

      // Store in D1
      await env.DB.prepare(
        `INSERT INTO submissions (name, email, message, ip, user_agent, country, city, region, referer, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        name, email, message,
        metadata.ip, metadata.userAgent, metadata.country,
        metadata.city, metadata.region, metadata.referer,
        metadata.timestamp
      ).run();

      // Send email notification via Resend
      if (env.RESEND_API_KEY && env.NOTIFICATION_EMAIL) {
        await sendEmail(env, name, email, message, metadata);
      }

      return jsonResponse({ success: true, message: "Thank you! Your message has been sent." });

    } catch (err) {
      console.error("Contact form error:", err);
      return jsonResponse({ error: "Something went wrong. Please try again." }, 500);
    }
  },
};

async function verifyTurnstile(token, ip, secretKey) {
  if (!token) return false;
  const resp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: secretKey,
      response: token,
      remoteip: ip,
    }),
  });
  const result = await resp.json();
  return result.success === true;
}

async function sendEmail(env, name, email, message, metadata) {
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Contact Form <contact@marksoper.me>",
        to: [env.NOTIFICATION_EMAIL],
        subject: `New contact from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
          <hr>
          <h3>Request Metadata</h3>
          <p><strong>IP:</strong> ${metadata.ip}</p>
          <p><strong>Location:</strong> ${metadata.city}, ${metadata.region}, ${metadata.country}</p>
          <p><strong>User Agent:</strong> ${metadata.userAgent}</p>
          <p><strong>Referer:</strong> ${metadata.referer}</p>
          <p><strong>Timestamp:</strong> ${metadata.timestamp}</p>
        `,
      }),
    });
  } catch (err) {
    console.error("Email send failed:", err);
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://marksoper.me",
    },
  });
}
