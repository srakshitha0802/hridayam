import { useState, useEffect } from 'react';

export interface RouteState {
  path: string;
  params: Record<string, string>;
  query: Record<string, string>;
}

export function parseHash(hash: string): RouteState {
  const cleanHash = hash.replace(/^#\/?/, '') || '';
  const [pathAndQuery] = cleanHash.split('#');
  const [pathname, queryString] = (pathAndQuery || '').split('?');

  const path = '/' + (pathname || '');
  const query: Record<string, string> = {};

  if (queryString) {
    const searchParams = new URLSearchParams(queryString);
    searchParams.forEach((val, key) => {
      query[key] = val;
    });
  }

  // Parse path parameters like /course/:id or /learn/:id
  const params: Record<string, string> = {};
  const segments = path.split('/').filter(Boolean);
  if (segments[0] === 'course' && segments[1]) {
    params.courseId = segments[1];
  } else if (segments[0] === 'learn' && segments[1]) {
    params.courseId = segments[1];
  } else if (segments[0] === 'verify-certificate' && segments[1]) {
    params.certificateId = segments[1];
  }

  return { path, params, query };
}

export function navigateTo(path: string) {
  const target = path.startsWith('#') ? path : `#${path.startsWith('/') ? path : '/' + path}`;
  window.location.hash = target;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function useLocation() {
  const [route, setRoute] = useState<RouteState>(() => parseHash(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHash(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return { ...route, navigate: navigateTo };
}
