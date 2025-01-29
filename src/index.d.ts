/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite-plugin-pwa/react" />
/// <reference types="@types/telegram-web-app" />

import 'vite/client'

declare global {
	interface Window {
		Telegram: Telegram
	}
}
