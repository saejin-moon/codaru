import { supabase } from "@/lib/supabase";

async function apiFetch(
    url: string,
    options: RequestInit = {}
) {
    const { data: { session } } = await supabase.auth.getSession();
    
    const headers = new Headers(options.headers);
    
    if (session?.access_token) {
        headers.set(
            "Authorization",
            `Bearer ${session.access_token}`
        );
    }
    
    return fetch(url, {
        ...options,
        headers,
    });
}

export const api = {
    token: apiFetch("/api/token")
};