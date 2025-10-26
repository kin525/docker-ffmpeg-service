export default {
  async fetch(request: Request): Promise<Response> {
    try {
      const { audio_url } = await request.json();

      if (!audio_url) {
        return new Response(JSON.stringify({ error: "Missing audio_url" }), { status: 400 });
      }

      const ffmpegResponse = await fetch("https://your-ffmpeg-api.com/mp3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audio_url })
      });

      const result = await ffmpegResponse.json();
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (err) {
      return new Response("Worker exception: " + err.message, { status: 500 });
    }
  }
};