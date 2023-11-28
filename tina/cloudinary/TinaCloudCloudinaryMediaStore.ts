import { CloudinaryMediaStore } from "./CloudinaryMediaStore";
import type { Client } from "tinacms";

/**
 * Brought from https://github.com/tinacms/tinacms/blob/main/packages/next-tinacms-cloudinary/src/cloudinary-tina-cloud-media-store.ts
 * Apache-2.0 licensed by TinaCMS
 * Modified to integrate with Next.js 13
 */

export class TinaCloudCloudinaryMediaStore extends CloudinaryMediaStore {
	client: Client;
	constructor(client: Client) {
		super();
		this.client = client;
		// @ts-ignore
		this.fetchFunction = async (input: RequestInfo, init?: RequestInit) => {
			try {
				const url = input.toString();
				const query = `${url.includes("?") ? "&" : "?"}clientID=${
					client.clientId
				}`;

				const res = client.fetchWithToken(url + query, init);
				return res;
			} catch (error) {
				console.error(error);
			}
		};
	}
}
