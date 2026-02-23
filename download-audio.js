const fs = require('fs');
const https = require('https');

const API_KEY = 'sk_dc8c4ad7c08e37b242d8b9480824c3174bcf430977ba3730';
// Using Rachel (very natural, expressive)
const VOICE_ID = '21m00Tcm4TlvDq8ikWAM';

const text = "Amor, você viu o salto que a conta deu hoje? Eu mal posso acreditar que a gente bateu a nossa meta! Juro, se me falassem que a gente ia resolver a nossa tensão financeira jogando um bingo, e rindo daqueles desafios criativos, eu não ia acreditar. E aqueles conselhos da Inteligência Artificial... salvaram a gente! Fechamos com chave de ouro!";

const data = JSON.stringify({
    model_id: 'eleven_multilingual_v2',
    text: text,
    voice_settings: {
        similarity_boost: 0.9,
        stability: 0.5,
        style: 0.1,
        use_speaker_boost: true
    }
});

const options = {
    hostname: 'api.elevenlabs.io',
    path: `/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`,
    method: 'POST',
    headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};

const req = https.request(options, (res) => {
    if (res.statusCode !== 200) {
        console.error(`Error: ${res.statusCode}`);
        res.on('data', d => process.stdout.write(d));
        return;
    }

    const filePath = './public/audio-futuro.mp3';
    const file = fs.createWriteStream(filePath);
    res.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log(`✅ Áudio mais natural salvo com sucesso!`);
    });
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
