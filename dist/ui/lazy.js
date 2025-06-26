'use client';
import dynamic from 'next/dynamic';
export const CodeExampleProvider = dynamic(() => import('./contexts/code-example.js').then((mod) => mod.CodeExampleProvider));
export const CodeExample = dynamic(() => import('./contexts/code-example.js').then((mod) => mod.CodeExample));
export const CodeExampleSelector = dynamic(() => import('./contexts/code-example.js').then((mod) => mod.CodeExampleSelector));
export const ClientLazy = dynamic(() => import('../playground/client.js'));
export const ApiProvider = dynamic(() => import('./contexts/api.js').then((mod) => mod.ApiProvider));
