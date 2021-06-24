import { Axios } from "./helper"

/**
 * Convert the passed the text string into speech using ms sdk
 * @param {string} text to be converted into speech
 */
 export const  createTextToSpeech = async(text) => {
    try {
        const {data:{data,error,message}} = await Axios.post(`/create_text_to_speech`, {text})
        return {data,error,message}
    } catch (error) {
        return {data:[], error: true, message: error.message}
    }
}
/**
 * Get all voice and language list
 * @returns object
 */
export const getTextToSpeechVoices = async() =>{
    try {
        const {data:{data,error,message}} = await Axios.get(`/get_text_to_speech_voice_list`)
        return {message, error, data}
    } catch (error) {
        return {data:[], error: true, message: error.message}
    }
}