/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

export {};

declare global {
	interface ImportMetaEnv {
		readonly VITE_EMAILJS_SERVICE_ID?: string;
		readonly VITE_EMAILJS_TEMPLATE_ID?: string;
		readonly VITE_EMAILJS_PUBLIC_KEY?: string;
		// more env variables...
		readonly [key: string]: string | undefined;
	}

	interface ImportMeta {
		readonly env: ImportMetaEnv;
	}
}