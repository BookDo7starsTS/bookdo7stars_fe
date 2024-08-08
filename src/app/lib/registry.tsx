'use client';

import React, { useState } from 'react';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => {
    const cache = createCache({ key: 'css' });
    cache.compat = true;
    return cache;
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
