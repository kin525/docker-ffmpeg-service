export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/" && request.method === "POST") {
      return new Response("收到 POST，但未設定轉檔邏輯", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }

    if (url.pathname === "/convert" && request.method === "POST") {
      const formData = await request.formData();
      const file = formData.get("file");

      if (!file || !(file instanceof File)) {
        return new Response("Missing audio file", { status: 400 });
      }

      // 你可以喺呢度 call 外部 FFmpeg API 或儲存 file
      return new Response("收到音訊檔案", { status: 200 });
    }

    return new Response("404 Not Found", { status: 404 });
  }
};