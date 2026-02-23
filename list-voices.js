const https = require('https');
const fs = require('fs');
const API_KEY = 'sk_dc8c4ad7c08e37b242d8b9480824c3174bcf430977ba3730';

const options = {
    hostname: 'api.elevenlabs.io',
    path: '/v1/voices',
    method: 'GET',
    headers: {
        'xi-api-key': API_KEY,
        'Accept': 'application/json'
    }
};

https.get(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        fs.writeFileSync('voices.json', data);
        console.log('Voices saved to voices.json');
    });
}).on('error', (e) => {
    console.error(e);
});
