import { renderToString } from "react-dom/server";
import App from "./App";
import { StaticRouter } from "react-router-dom";

export function render(url: string) {
    return renderToString(
        <StaticRouter location={url}>
            <App name='Vite + React + Ts' />
        </StaticRouter>
    );
}