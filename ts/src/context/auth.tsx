import { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthCtx = createContext<AuthContextType>(undefined!);

export function AuthProvider({ children }: { children: preact.ComponentChildren }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
            setLoading(false);
        });
        
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });
        
        return () => subscription.unsubscribe();
    }, []);
    
    async function signOut() {
        await supabase.auth.signOut();
    }
    
    return (
        <AuthCtx.Provider value={{ user, loading, signOut }}>
            {children}
        </AuthCtx.Provider>
    );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
