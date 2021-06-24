import axios from 'axios'
/**
 * Returns the server url
 */
export const SERVER_URL = "https://supatexttospeech.herokuapp.com"
/**
 * 
 * Returns api path
 *  
 */
export const API_URL = `${SERVER_URL}/api`
/**
 * Get the file path of an audio file by joining the server url with the file path
 * @param {string} filePath to construct the file path to the server
 * @returns string
 */
export const getFilePath = (filePath) => `${API_URL}/stream_text_to_speech/${filePath}`
/**
 * Get all the specified attributes and construct an xml text and returns a string version of it
 * @param {object} param object that contains language, voice, voume, style,speed,inputText as properties
 * @returns string
 */
export const createMessage = ({language,voice,style,speed,inputText,volume}) =>{
    if(!style || style.trim() === ""){
        return `<speak version="1.0"
                    xmlns="http://www.w3.org/2001/10/synthesis"
                    xml:lang="${language}">
                    <voice name="${voice}">
                        <lang xml:lang="${language}">
                            <prosody rate="+${speed}.00%" volume="+${volume}.00%">
                                ${inputText}
                            </prosody>
                        </lang>
                    </voice>
                </speak>`
    }
    return `<speak version="1.0"
            xmlns="http://www.w3.org/2001/10/synthesis"
            xmlns:mstts="http://www.w3.org/2001/mstts"
            xml:lang="${language}">
            <voice name="${voice}">
            <mstts:express-as style="${style}">
                <lang xml:lang="${language}">
                    <prosody rate="+${speed}.00%" volume="+${volume}.00%">
                        ${inputText}
                    </prosody>
                </lang>
                </mstts:express-as>
            </voice>
        </speak>`
}
/**
 * Parse an xml extracting only text found inside prosody element
 * @param {string} xml contains xml tags
 * @returns string
 */
export const parseXmlToText = (xml) =>{
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xml,"text/xml")
    const result = xmlDoc.getElementsByTagName('prosody')
    console.log(result)
    if(result.length === 0){
        return "Hello world"
    }
    console.log(result[0].childNodes[0].nodeValue)
    const text = result[0].childNodes[0].nodeValue
    return text.toString().trim()
}
/**
 * Create axios instance
 * Returns axios instance 
 */
export const Axios = axios.create({baseURL: API_URL,withCredentials: true})


