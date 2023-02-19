interface WebdavData {
	url: string;
	account: string;
	password: string;
}

export function test() {
	console.log("this is a webdav function");
}

export async function webdavVerify(info: WebdavData): Promise<boolean> {
	return true;
}
