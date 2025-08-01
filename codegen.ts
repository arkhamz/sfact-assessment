import "dotenv/config";
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    // schema: import.meta.env.VITE_SCHEMA_URL,
    schema: process.env.VITE_SCHEMA_URL,
    // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
    documents: ["src/**/*.{ts,tsx}"],
    generates: {
        "./src/__generated__/": {
            preset: "client",
            plugins: [],
            presetConfig: {
                gqlTagName: "gql",
            },
            config: {
                useTypeImports: true, // The updated setting.
            },
        },
    },
    ignoreNoDocuments: true,
};

export default config;
