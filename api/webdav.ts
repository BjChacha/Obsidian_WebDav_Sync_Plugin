import { request, requestUrl } from "obsidian";
import { WebdavData } from "../interface";

export async function test() {
	console.log("this is a webdav test function");

	const account = "bjchacha@outlook.com";
	const password = "a993mh93qw7fkgdf";
	const encoded = Buffer.from(`${account}:${password}`).toString("base64");

	const prop = {
		url: "https://dav.jianguoyun.com/dav/",
		method: "OPTIONS",
		headers: {
			Authorization: `Basic ${encoded}`,
		},
	};

	const response = await request(prop);

	return response;
}

export async function webdavVerify(info: WebdavData): Promise<boolean> {
	console.log("this is a webdavVerify function");
	// console.log(info);

	// TODO:基本完成功能，但需要根据不同的错误提示用户哪个信息错误

	const encoded = Buffer.from(`${info.account}:${info.password}`).toString(
		"base64"
	);

	const prop = {
		url: info.url,
		method: "OPTIONS",
		headers: {
			Authorization: `Basic ${encoded}`,
		},
	};

	const response = await requestUrl(prop);

	if (response.status === 200) return true;
	else return false;
}
