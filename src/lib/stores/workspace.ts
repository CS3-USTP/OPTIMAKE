// src/lib/stores/workspace.ts
import { browser } from '$app/environment';        // SvelteKit only; omit if pure Svelte
import { writable } from 'svelte/store';

// 1. Initialize from localStorage (guarded for SSR)
const initial = browser
  ? localStorage.getItem('workspace') ?? 'default'
  : 'default';

// 2. Create a writable store
export const currentWorkspace = writable<string>(initial);

// 3. Subscribe and persist changes
if (browser) {
  currentWorkspace.subscribe((value) => {
    localStorage.setItem('workspace', value);
  });
}
