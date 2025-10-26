export default {
  async fetch(request: Request): Promise<Response> {
    try {
      const { audio_url } = await request.json();

      if (!audio_url) {
        return new Response(JSON.stringify({ error: "Missing audio_url" }), { status: 400 });
      }

      // 下載音訊檔案
      const audioResponse = await fetch(audio_url);
      const audioBlob = await audioResponse.blob();

      // 建立 multipart/form-data
      const formData = new FormData();
      formData.append("file", audioBlob, "input.ogg");

      // 傳送去 FFmpeg API
      const ffmpegResponse = await fetch("https://your-ffmpeg-api.com/mp3", {
        method: "POST",
        body: formData
      });

      // 回傳 binary MP3
      const mp3Blob = await ffmpegResponse.blob();
      return new Response(mp3Blob, {
        headers: { "Content-Type": "audio/mpeg" }
      });
    } catch (err) {
      return new Response("Worker exception: " + err.message, { status: 500 });
    }
  }
};