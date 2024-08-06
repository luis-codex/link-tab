import { type RouteObject } from "react-router-dom";
import Root from "./pages/Root/page";

export const routes: RouteObject[] = [
    {
        path: '/',
        Component: Root,
        children: [
            {
                path: 'bookmarks/:id',
                lazy: async () => {
                    const { default: Component, } = await import('./pages/Root/bookmarks/page')
                    return { Component, }
                },
            },
            {
                path: 'tabs/*',
                lazy: async () => {
                    const { default: Component } = await import('./pages/Root/tabs/page')
                    return { Component }
                },
            }, {
                path: 'ai',
                lazy: async () => {
                    const { default: Component } = await import('./pages/ai/page')
                    return { Component }
                },
            }
        ]
    },
    {
        path: '/settings',
        lazy: async () => {
            const { default: Component } = await import('./pages/settings/page')
            return { Component }
        },
    }

];