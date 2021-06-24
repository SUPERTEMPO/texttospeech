const textSpeechService = require("../services/textSpeechService")
const fs = require('fs')
const { getFilePath } = require("../utils/helper")
module.exports = {
    /**
     * Handles straming 
     * @param {object} req Express Request
     * @param {object} res Express Response
     * @returns response
     */
     streamTextToSpeech: async(req,res) =>{
        try {
            const {fileName} = req.params
            if(!fileName || fileName.trim() === ""){
                return res.status(406).json({code: 406, error: true, message: "Sorry an error occurred, Invalid file format received",data: []})
            }
            const filePath = getFilePath(fileName)
            const fileExist = fs.existsSync(filePath)
            if(!fileExist){
                return res.status(404).json({code: 404, error: true, message: "Sorry an error occurred, file does not exist",data: []})
            }
            const stat = fs.statSync(filePath)
            const fileSize = stat.size
            res.setHeader('Content-Length', fileSize);
            res.setHeader('Content-Type', 'audio/wav');
            res.flushHeaders()
            fs.createReadStream(filePath).pipe(res)
        } catch (error) {
            res.status(406).json({code: 406, error: true, message: "Sorry an error occurred, Invalid file data received",data: []})
        }
    },
    /**
     * Handles creation of a new ssml to speech
     * @param {object} req Express Request
     * @param {object} res Express Response
     * @returns response
     */
     createSsmlToSpeech: async(req,res) =>{
        try {
            if(!req.body || !req.body.text || req.body.text.toString().trim() === ""){
                return res.status(406).json({code: 406, error: true, message: "Sorry an error occurred, Invalid data format sent ",data: []})
            }
            const _res = await textSpeechService.convertSsmlToSpeech(req.body.text)
            res.status(_res.code).json(_res)
        } catch (error) {
            res.status(406).json({code: 406, error: true, message: "Sorry an error occurred, Invalid data sent",data: []})
        }
    },
    /**
     * get all text to speech voices
     */
    getTextToSpeechVoices: async(req,res) =>{
        try {
            const _res = await textSpeechService.fetchTextToSpeechVoices()
            res.status(_res.code).json(_res)
        } catch (error) {
            res.status(406).json({code: 406, error: true, message: "Sorry an error occurred, Invalid data request",data: []})
        }
    }
}