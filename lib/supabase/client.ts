import { createBrowserClient } from '@supabase/ssr';
import { Database } from '../database.types';

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return document.cookie
            .split('; ')
            .map((cookie) => {
              const [name, ...rest] = cookie.split('=');
              return { name, value: rest.join('=') };
            })
            .filter(({ name }) => name.length > 0);
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            let cookie = `${name}=${value}`;

            if (options?.maxAge) {
              cookie += `; max-age=${options.maxAge}`;
            }
            if (options?.path) {
              cookie += `; path=${options.path}`;
            }
            if (options?.domain) {
              cookie += `; domain=${options.domain}`;
            }
            if (options?.sameSite) {
              cookie += `; samesite=${options.sameSite}`;
            }
            if (options?.secure) {
              cookie += '; secure';
            }

            document.cookie = cookie;
          });
        },
      },
    }
  );
}
