function splitArray(chunkSize: number, data: Array<any>) {
    const chunks: Array<any> = [];

    data.forEach((item) => {
        if(!chunks.length || chunks[chunks.length-1].length == chunkSize)
        chunks.push([]);

        chunks[chunks.length-1].push(item);
    })
    return chunks;
}

export default splitArray;