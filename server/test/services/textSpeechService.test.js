require('dotenv').config();
const textSpeechService = require('../../services/textSpeechService')
/**
 */
 describe('Testing function fetchTextToSpeechVoices() ', () => {
    test('should fail if internet connection fails', async() => {
        const res = await textSpeechService.fetchTextToSpeechVoices()
        expect(res.error).toBeFalsy()
    })
    test('should pass if internet is connected and a service region and subscription  is valid', async() => {
        const res = await textSpeechService.fetchTextToSpeechVoices("hello world this is me testing text to speech library")
        expect(res.code).toBe(200)
    })
    
})

describe('Testing function convertxmlToSpeech() ', () => {
    test('should fail if no data provided', async() => {
        const res = await textSpeechService.convertSsmlToSpeech()
        expect(res.error).toBeFalsy()
    })
    test('should fail if a string is provided', async() => {
        const res = await textSpeechService.convertSsmlToSpeech("hello world this is me testing text to speech library")
        expect(res.error).toBeFalsy()
    })
    test('should fail with a code status  500 if a string is provided', async() => {
        const res = await textSpeechService.convertSsmlToSpeech("hello world this is me testing text to speech library")
        expect(res.code).toBe(200)
    })
    test('should pass with a code status  200 if a valid string xml is provided', async() => {
        const xml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
            <voice name="en-US-JennyNeural">
                <lang xml:lang="en-US">
                    <prosody rate="+90.00%" volume="+90.00%">
                     Hello world this is from test
                    </prosody>
                </lang>
            </voice>
        </speak>`
        const res = await textSpeechService.convertSsmlToSpeech(xml)
        expect(res.code).toBe(200)
    })
    
})



