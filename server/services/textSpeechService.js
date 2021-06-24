const sdk = require("microsoft-cognitiveservices-speech-sdk");
const appConfig = require("../config/appConfig");
const { getFilePath, removeAllFilesInDirectory } = require("../utils/helper");
const axios = require('axios');

const helper = require("../utils/helper");
module.exports = {
    /**
     * Converts a string xml to audio speech
     * @param {string} ssml xml string
     * @returns object
     */
    convertSsmlToSpeech: async(ssml) =>{
        const {subscriptionKey, serviceRegion} = appConfig
        // remove all old files from the the directory
        await removeAllFilesInDirectory()
        // initialize file name
        const fileName = new Date().getTime()+"-speech.wav"
        //initialize file path
        const filePath = getFilePath(fileName)
        // initialiaze an audio with the desired file name.
        const audioConfig = sdk.AudioConfig.fromAudioFileOutput(filePath);
        // create a config with the require credentials
        const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion)
        // create the speech synthesizer.
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig)
        return new Promise((resolve,reject) =>{
            synthesizer.speakSsmlAsync(ssml, 
                (res) =>{
                    let message = null
                    let error = false
                    let code = 200
                    let data = []
                    if(res.errorDetails){
                        message =  `Speech synthesis canceled, ${res.errorDetails}. Check your credentials provided`
                        error = true
                        code = 500
                    }
                    else{
                        data = [{fileName}]
                        message = "Speech created successfully"
                    }
                    synthesizer.close();
                    resolve({error, message, data, code})
                },
                (err) =>{
                    synthesizer.close();
                    reject({error: true, message: err, data: [], code: 502})
                }
            )
        }) 
    },
    /**
     * fetch all text to speech voiceList & languages
     */
    fetchTextToSpeechVoices: async() =>{
        try {
            const {data} = await axios.get('https://centralus.tts.speech.microsoft.com/cognitiveservices/voices/list',{
                headers:{
                    'Ocp-Apim-Subscription-Key': appConfig.subscriptionKey
            }})
            const formatData = data.map(d => ({...d,Language: helper.localeCodeToEnglish(d.Locale)}))
            return {data: formatData, error: false, message: "Fectched successfully", code: 200 }
        } catch (error) {
            return {data: [], error: true, message: "Sorry an error occurred trying to fetch all voice list", code: 200 }
        }
    }
}