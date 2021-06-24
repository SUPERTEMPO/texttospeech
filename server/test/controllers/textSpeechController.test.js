require('dotenv').config();
const supertest = require('supertest')
const app = require('../../loaders/loader');
const textSpeechController = require('../../controllers/textSpeechController')

const agent = supertest.agent(app)

describe('Testing /api/get_text_to_speech_voice_list & function  getTextToSpeechVoices() ', () => {
    test('should fail if internet is not connected', async() => {
        const res = await agent.get('/api/get_text_to_speech_voice_list', textSpeechController.getTextToSpeechVoices) 
         expect(res.body.error).toBeFalsy()
    })
    test('should pass if internet is connected and a service region and subscription  is valid', async() => {
        const res = await agent.get('/api/get_text_to_speech_voice_list', textSpeechController.getTextToSpeechVoices)
        expect(res.body.message).toBe("Fectched successfully")
    })
    
})

describe('Testing /api/create_text_to_speech & function createSsmlToSpeech() ', () => {
    test('should fail if no data provided', async() => {
        const res = await agent.post('/api/create_text_to_speech', textSpeechController.createSsmlToSpeech) 
        expect(res.body.error).toBeFalsy()
    })
    test('should fail  with status code 500 if a string is provided', async() => {
        const res = await agent.post('/api/create_text_to_speech', textSpeechController.createSsmlToSpeech) 
        expect(res.body.code).toBe(200)
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
        const res = await agent.post('/api/create_text_to_speech', textSpeechController.createSsmlToSpeech).send({text: xml})
        expect(res.body.code).toBe(200)
    })
    
})

describe('Testing /api/stream_text_to_speech & function  getTextToSpeechVoices() ', () => {
    test('should fail if file does not exist', async() => {
        const res = await agent.get('/api/stream_text_to_speech/hello.wav', textSpeechController.streamTextToSpeech) 
         expect(res.body.error).toBeFalsy()
    })
    test('should pass if the correct file name is passed', async() => {
        const res = await agent.get('/api/stream_text_to_speech/1624476005639-speech.wav', textSpeechController.streamTextToSpeech)
        expect(res.statusCode).toBe(200)
    })
    
})


