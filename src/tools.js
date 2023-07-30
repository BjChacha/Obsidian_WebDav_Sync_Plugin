
export function toBase64(text) {
    return Buffer.from(text,'utf-8').toString('base64');
}

export function fromBase64(text) {
    return Buffer.from(text, 'base64').toString('utf-8')
}
