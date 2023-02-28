import { request } from "obsidian";
import { WebdavData } from "../interface";

export async function test() {
	console.log("this is a webdav test function");

	const prop = {
		url: "https://dav.jianguoyun.com/dav/",
		method: "OPTIONS",
		// 403：这里差验证
		headers: {
			method: "OPTIONS",
			mode: "cors",
			credentials: "same-origin",
			referrerPolicy: "no-referrer",
		},
	};

	const response = await request(prop);

	return response;
}

export async function webdavVerify(info: WebdavData): Promise<boolean> {
	return true;
}
