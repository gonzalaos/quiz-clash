import { QueryClient } from "@tanstack/react-query";

export const BASE_API_URL = window._env_?.BACKEND_EXTERNAL_URL || "http://localhost:8080/api";

export const appQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});
