module.exports = {
    client: {
        includes: ['./server/**/**.ts'],
        service: {
            name: 'localhost',
            url: 'http://localhost:4000/',
            skipSSLValidation: true
        }
    }
};
