import plugin from 'tailwindcss/plugin';
import { CSSRuleObject } from 'tailwindcss/types/config';


const flexBox: CSSRuleObject = {   // Flexbox utilities
    '.u-flex-center': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    '.u-flex-center-start': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    '.u-flex-center-end': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    '.u-flex-center-between': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    '.u-flex-center-around': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
}


const twCompoents = plugin(function ({ addComponents }) {
    addComponents({
        ...flexBox,
        /* Scrollbar utilities */
        '.u-scrollbar-thin': {
            'scrollbar-width': 'thin',
            'scrollbar-color': 'hsl(var(--border)) transparent',
        },
        /* Sizing  utilities */
        '.u-size-screen': {
            width: '100vw',
            height: '100vh',
        },

        /* Placeholder utilities */
        '.u-placeholder-parallelogram': {
            width: '60%',
            height: '100%',
            opacity: '.98',
            transform: 'skew(-30deg)',
            backgroundPosition: '52%',
            backgroundSize: '600px 600px',
            backgroundRepeat: 'no-repeat',
        },

        /* Tracking utilities */
        '.u-tracking-screen-tighter': {
            letterSpacing: '-0.058125rem',
        },
        '.u-tracking-screen-tight': {
            letterSpacing: '-0.020625rem',
        },

        /* Background utilities */
        '.u-bg-points-gradient': {
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundPosition: '50% 50%',
            backgroundSize: '1.1rem 1.1rem',
        },
        '.u-bg-noise': {
            position: 'relative',
        },
        '.u-bg-noise::after': {
            content: '""',
            filter: 'url(#noiseFilter)',
            'mix-blend-mode': 'soft-light',
            'pointer-events': 'none',
            position: 'absolute',
            inset: '0',
            width: '100%',
            height: '100%',
            opacity: '1',
        },

        /* Text utilities */
        '.people_hello': { /* .u-text-large-title': {} */
            fontSize: '100px',
            fontWeight: '600',
            lineHeight: '116px',
            letterSpacing: '-3px',
            whiteSpace: 'nowrap',
            background: 'linear-gradient(to right, hsl(var(--accent-2)), hsl(var(--accent-1)))',
            backgroundPositionX: '100%',
            '-webkit-background-clip': 'text',
            backgroundClip: 'text',
            color: 'transparent',
            opacity: '.4',
            marginBottom: '32px',
            overflow: 'hidden',
        },
        /* text
        base64 to svg: https://base64.guru/converter/decode/image/svg
        svg to css: https://yoksel.github.io/url-encoder/
        */

        ".u-text-underlined-circled": {
            "display": "inline-block",
            "position": "relative",
            "zIndex": "-1"
        },
        ".u-text-underlined-circled::after": {
            "background": "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHZpZXdCb3g9IjAgMCA0NjUgMTA0Ij48cGF0aCBzdHJva2U9IiMxNUUwQUYiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTEgNDkuNDg0YzQwLjk2NS0xMC43ODggMTU2LjQ2OS0zMy45OSAyMzcuOTg5LTM0LjA0MyA4MS41MTktLjA1MyAxODQuNDk0IDE3LjYzMSAxODUuNjg1IDQyLjI1MiAxLjE5IDI0LjYyMi0xMTcuMjE4IDQ3Ljc2OC0yMDAuNjI2IDQ0Ljc3Ni04My40MDctMi45OTItMTc2LjQ0MS0xOS44OS0xNzEuNDczLTQyLjMzNUM1OS4wMDQgMzEuMDg4IDE3Ny4yMzQtMS43NDQgMjYwLjA1OCAxLjE4MmM5OC4yMjcgMy40NzEgMTcwLjg3IDE3Ljg0MSAyMDMuNTk0IDY0LjY0IiB2ZWN0b3ItZWZmZWN0PSJub24tc2NhbGluZy1zdHJva2UiLz48L3N2Zz4=) no-repeat 50%",
            "backgroundSize": "98%",
            "content": "''",
            "left": "-20%",
            "marginTop": "-20%",
            "paddingTop": "40%",
            "pointerEvents": "none",
            "position": "absolute",
            "right": "-20%",
            "top": "50%",
            "zIndex": "-1",
        },

        ".u-text-underlined-highlighted": {
            "display": "inline-block",
            "margin": "0 -6px 0 -3px",
            "padding": "0 6px 0 3px",
            "position": "relative",
            "whiteSpace": "nowrap",
            "zIndex": "0",
        },
        ".u-text-underlined-highlighted::after": {
            "background": "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHZpZXdCb3g9IjAgMCA5NSA0NSI+PHBhdGggc3Ryb2tlPSIjMTVFMEFGIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjQzIiBkPSJNMjIgMjJoMTMuNzQ3YzYuNjIxIDAgOC40OSAxIDE5LjIyNSAxIDYuNzY1IDAgMTAuMjktMSAxNy4wMjgtLjY5IiBvcGFjaXR5PSIuMyIgdmVjdG9yLWVmZmVjdD0ibm9uLXNjYWxpbmctc3Ryb2tlIi8+PC9zdmc+) no-repeat 50%",
            "backgroundSize": " calc(193.2% - 95px) 47px",
            "bottom": "0",
            "content": "''",
            "left": "0",
            "position": "absolute",
            "right": "0",
            "top": "0",
            "zIndex": "-1",
        },

        ".u-text-underlined": {
            "background": "none",
            "border": "0",
            "boxSizing": "border-box",
            "cursor": "pointer",
            "display": "inline-block",
            "letterSpacing": "0.005em",
            "padding": "0",
            "position": "relative",
            "textAlign": "left",
            "textDecoration": "none",
            "WebkitUserSelect": "text",
            "MozUserSelect": "text",
            "msUserSelect": "text",
            "userSelect": "text",
            "whiteSpace": "nowrap",
        },
        ".u-text-underlined::after": {
            background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' preserveAspectRatio='none' viewBox='0 0 84 6'%3E%3Cpath stroke='%23ffffff66' stroke-linecap='round' stroke-miterlimit='10' stroke-width='1.5' d='M2 2.344C21.277.498 69.932 6.91 82 2.29' vector-effect='non-scaling-stroke'/%3E%3C/svg%3E")  no-repeat bottom`,
            "backgroundSize": "calc(105% - 5px) 6px",
            "bottom": "0px",
            "content": "''",
            "height": "6px",
            "left": "-1px",
            "position": "absolute",
            "right": "-2px",
        },

        ".u-text-underlined-box": {
            "position": "relative",
        },
        ".u-text-underlined-box::after": {
            "backgroundImage": "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHZpZXdCb3g9IjAgMCAxMTkgMzQiPjxwYXRoIHN0cm9rZT0iIzE1RTBBRiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIzMiIgZD0iTTMgMThjMjguNTYtNSA5MS44NCAyIDExMi0yIiBvcGFjaXR5PSIuMyIvPjwvc3ZnPg==)",
            "backgroundPosition": "0",
            "backgroundRepeat": "no-repeat",
            "backgroundSize": "100 % 1",
            "bottom": "0",
            "content": "''",
            "left": "0",
            "position": "absolute",
            "right": "0",
            "top": "0",
            "zindex": "-1",
        },

        // Rank Podium
        '.c-rank-podium__box': {
            "--gradient": "hsl(var(--accent-2)), hsl(var(--accent-1))",
            textAlign: 'center',
            fontWeight: '600',
            maxWidth: '200px',
            padding: '20px',
            background: 'linear-gradient(to bottom, var(--gradient))',
            border: '1px solid transparent',
            borderImage: 'linear-gradient(hsl(var(--accent-3)), hsl(var(--accent-1))) 1',
            position: 'relative',
            boxSizing: 'border-box',
            height: '50%',
        },
        '.c-rank-podium__box::before': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '20px',
            backgroundImage: 'linear-gradient(to top, var(--gradient))',
            transform: 'perspective(30px) rotateX(20deg)',
            transformOrigin: 'bottom center',
            top: '-21px',
            left: '0',
        },

        // Divider
        '.u-divider-degrade-horizontal': {
            '--degrees': '90deg',
            background: 'linear-gradient(var(--degrees), transparent, hsl(var(--accent-7)), transparent)',
            height: '1px',
            filter: 'brightness(20%)',
            width: '100%',
        },

        /* CARD v1 DESING EXPERIMENTAL */
        '.c-card-name__text': {
            '--accent-color': 'hsl(var(--accent-4))',
            boxShadow: '0 0 0 2px hsl(var(--accent-4))',
            padding: '0 0.25rem',
            position: 'relative',
            display: 'inline-flex',
            marginLeft: '0.5rem', // 8px
            lineHeight: '4.5rem', // 72px
        },

        // Card Name Selection Dot
        '.c-card-name__selection-dot': {
            background: '#fff',
            width: '4px',
            height: '4px',
            boxShadow: '0 0 0 1px hsl(var(--accent-4))',
            position: 'absolute',
        },

        // Card Name Width Indicator
        '.c-card-name__width-indicator': {
            display: 'inline-block',
            width: 'fit-content',
            letterSpacing: '-1px',
            // lineHeight: '16px',
            borderRadius: '3px',
            padding: '1px 4px',
            background: 'hsl(var(--accent-4))',
            position: 'absolute',
            top: '-28px',
            left: '50%',
            transform: 'translateX(-50%)',
            textWrap: 'nowrap',
            fontSize: '0.875rem', // 14px
            lineHeight: '1.25rem', // 20px
            fontWeight: '600',
        },
    });
})

export default twCompoents