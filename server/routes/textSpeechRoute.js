const appConfig = require('../config/appConfig')
const textSpeechController = require('../controllers/textSpeechController')
const router = require('express').Router()

// get all voices & languages
router.get(`${appConfig.APIURL}/get_text_to_speech_voice_list`,
textSpeechController.getTextToSpeechVoices)
// create text to speech route
router.post(`${appConfig.APIURL}/create_text_to_speech`,
textSpeechController.createSsmlToSpeech)
// stream the audio
router.get(`${appConfig.APIURL}/stream_text_to_speech/:fileName`,
textSpeechController.streamTextToSpeech)





module.exports = router