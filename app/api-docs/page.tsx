import SwaggerUiComponent from "./SwaggerUiComponent";

export const metadata = {
    title: "Mail Inbox API Documentation",
    description: "Interactive Swagger UI documentation playground for Jim's Mail Inbox backend endpoints.",
};

export default function ApiDocsPage() {
    return (
        <main style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
            <SwaggerUiComponent />
        </main>
    );
}