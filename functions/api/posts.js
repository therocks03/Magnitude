export async function onRequestGet(context) {
  const { env } = context;
  
  try {
    // Try to get posts from KV
    const postsJson = await env.BLOG_KV.get("posts");
    
    if (!postsJson) {
      // If KV is empty, return an empty array or you could return the static seed posts
      return new Response(JSON.stringify([]), {
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(postsJson, {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch posts", details: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const data = await request.json();
    const { post, password } = data;

    // BASIC SECURITY: Change this or set it as an Environment Variable in Cloudflare
    const ADMIN_PASSWORD = env.ADMIN_PASSWORD || "magnitude_admin_2026";

    if (password !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Get current posts
    let posts = [];
    const currentPostsJson = await env.BLOG_KV.get("posts");
    if (currentPostsJson) {
      posts = JSON.parse(currentPostsJson);
    }

    // Add new post to the beginning
    posts.unshift(post);

    // Save back to KV
    await env.BLOG_KV.put("posts", JSON.stringify(posts));

    return new Response(JSON.stringify({ success: true, post }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to save post", details: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
