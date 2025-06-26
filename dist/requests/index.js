import * as CURL from '../requests/curl.js';
import * as JS from '../requests/javascript.js';
import * as Go from '../requests/go.js';
import * as Python from '../requests/python.js';
import * as Java from '../requests/java.js';
import * as CSharp from '../requests/csharp.js';
export const defaultSamples = [
    {
        label: 'cURL',
        source: CURL.generator,
        lang: 'bash',
    },
    {
        label: 'JavaScript',
        source: JS.generator,
        lang: 'js',
    },
    {
        label: 'Go',
        source: Go.generator,
        lang: 'go',
    },
    {
        label: 'Python',
        source: Python.generator,
        lang: 'python',
    },
    {
        label: 'Java',
        source: Java.generator,
        lang: 'java',
    },
    {
        label: 'C#',
        source: CSharp.generator,
        lang: 'csharp',
    },
];
