import {toBase64} from './tools';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import request from 'request';

class Webdav {
	constructor(info) {
		this.url = info.url;
		this.username = info.username;
		this.password = info.password;
	}

	uploadFile(filepath) {

		const authHeader = `Basic ${toBase64(`${this.username}:${this.password}`)}`;
		const data = readFileSync('filepath');
		const headers = {
			'Content-Type': 'application/octet-stream',
			'Authorization': authHeader,
		};
		const options = {
			url: join(this.url, 'file1.txt'),
			method: 'PUT',
			headers,
			data
		}
		request(options, (err, res) => {
			if (err) {
				throw new Error(err);
			}
			console.log(`file ${filepath} upload success`);
		});
	}
}
