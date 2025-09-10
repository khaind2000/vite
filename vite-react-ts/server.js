import express from "express";
import { createServer as createViteServer } from "vite";

async function createServer() {
    const app = express();

    const vite = await createViteServer({
        server: { middlewareMode: true },
    });

    app.use(vite.middlewares);

    // Dùng regex thay vì "*"
    app.use(/.*/, async (req, res) => {
        try {
            const url = req.originalUrl;
            const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
            const appHtml = render(url);
            const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Vite SSR + Routing</title></head>
          <body>
            <div id="root">${appHtml}</div>
            <script type="module" src="/src/main.tsx"></script>
          </body>
        </html>`;

            res.status(200).set({ "Content-Type": "text/html" }).end(html);
        } catch (e) {
            vite.ssrFixStacktrace(e);
            res.status(500).end(e.message);
        }
    });

    app.listen(5173, () =>
        console.log("SSR server running at http://localhost:5173")
    );
}

createServer();