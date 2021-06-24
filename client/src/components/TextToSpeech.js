import React, { useRef, useState, useEffect} from 'react'
import { createTextToSpeech, getTextToSpeechVoices } from '../util/functions';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card,Row,Col, Button, CardBody, Container, CardHeader, Form, FormGroup, Label } from 'reactstrap';

import InputRange from 'react-input-range'
import { createMessage, getFilePath, parseXmlToText } from '../util/helper';
import 'react-input-range/lib/css/index.css'
import classnames from 'classnames';

const TextToSpeech = () => {
    const [inputText, setInputText] = useState('');
    const [inputSsml, setInputSsml] = useState('')
    const [outputText, setOutputText] = useState('')
    const [filePath, setFilePath] = useState('')
    const [loading, setLoading] = useState(false)
    const [language, setLanguage] = useState('')
    const [voice, setVoice] = useState('')
    const [speed, setSpeed] = useState(20)
    const [volume, setVolume] = useState(50)
    const [style, setStyle] = useState('')
    const [dataList, setDataList] = useState([])
    const [langList, setLangList] = useState([])
    const [voiceList, setVoiceList] = useState([])
    const [styleList, setStyleList] = useState([])
    const [activeTab, setActiveTab] = useState('1');

    //create audio ref
    const audioRef = useRef(null)

    useEffect(() => {
        const fetchData = async() =>{
            try {
               const _res = await getTextToSpeechVoices()
               if(!_res.error){
                    const distinct = []
                    _res.data.forEach(_d => {
                       if(distinct.findIndex(_i => _i.Language === _d.Language) === -1){
                           distinct.push(_d)
                       }
                    })
                   setLangList(distinct)
                   setDataList(_res.data)
               }
            } catch (error) {
                
            }
        }
        fetchData()
        return () => {}
    }, [])
    // useeffect to update ssml input anytime there is a change
    useEffect(() => {
        setInputSsml(createMessage({language,voice,style,inputText,speed,volume}))
        return () => {
            
        }
    }, [language,voice,style,inputText,speed,volume])
    // toggles tabs
    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }
    const handleTextChange = e =>{
        setInputText(e.target.value)
        setOutputText('')
    }
    const handleSsmlChange = e =>{
        setInputSsml(e.target.value)
    }
    const handleLanguageChange = e =>{
        const value = e.target.value
        const _data = dataList.filter(_d => _d.Locale === value)
        setLanguage(value)
        setVoiceList(_data)
        setVoice('')
        setStyleList([])
        setStyle('')
    }
    const handleVoiceChange = e =>{
        const value = e.target.value
        const _data = voiceList.filter(_d => _d.ShortName === value)[0]
        setVoice(value)
        if(!_data.StyleList) {
            setStyle('')
            return setStyleList([])
        }
        setStyle(_data.StyleList[0])
        setStyleList(_data.StyleList)
    }
    const handleStyleChange = e =>{
        setStyle(e.target.value)
    }
    const handleSpeedChange = (e) =>{
        setSpeed(e)
    }
    const handleVolumeChange = (e) =>{
        setVolume(e)
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            if(activeTab === "1" && inputText.trim() === ""){
                return setOutputText("Please type something")
            }
            if(activeTab === "2" && inputText.trim() === ""){
                setInputText(parseXmlToText(inputSsml))
            }
            if(language.trim() === ""){
                return setOutputText("Please select a language")
            }
            if(voice.trim() === ""){
                return setOutputText("Please select a voice")
            }
            if(activeTab === "2" && inputSsml.trim() === ""){
                return setOutputText("Please enter ssml version for text to speech")
            }
            setOutputText('')
            setLoading(true)
            const message = activeTab === "1" ? createMessage({language,style,voice,speed,volume,inputText}): inputSsml
            const res = await createTextToSpeech(message)
            if(!res.error){
                setFilePath(getFilePath(res.data[0].fileName))
                audioRef.current.play()
            }
            setOutputText(res.message)
            setLoading(false)
        } catch (error) {
            
        }
    }
    
    return (
        <div>
            <Container>
                <Card>
                    <CardHeader><h2 className="text-center">Microsoft Text To Speech Sample Using Nodejs & Reactjs</h2></CardHeader>
                    <CardBody>
                        <Row>
                            <Col lg="6" md="6" xl="6">
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '1' })}
                                            onClick={() => { toggle('1'); }}
                                        >
                                            Text VERSION
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '2' })}
                                        onClick={() => { toggle('2'); }}
                                    >
                                        SSML VERSION
                                    </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <form>
                                            <textarea className="form-control" placeholder="Type a message here" rows="15" value={inputText} onChange={handleTextChange}></textarea>
                                        </form>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <form>
                                            <textarea className="form-control" placeholder="Type a message here" rows="15" value={inputSsml} onChange={handleSsmlChange}></textarea>
                                        </form>
                                        
                                    </TabPane>
                                </TabContent>
                                <p className="text-center text-danger">{outputText}</p>
                            </Col>
                            <Col lg="6" md="6" xl="6">
                                <Form>
                                    <FormGroup>
                                        <Label>Language</Label>
                                        <select value={language} onChange={handleLanguageChange} className="form-control">
                                            <option>Select language</option>
                                            {
                                                langList && langList.map((d,i) => (
                                                    <option key={i} value={d.Locale}>{d.Language}</option>
                                                ))
                                            }
                                        </select>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Voice</Label>
                                        <select value={voice} onChange={handleVoiceChange} className="form-control">
                                            <option>Select voice</option>
                                            {
                                                voiceList && voiceList.map((d,i) => (
                                                    <option key={i} value={d.ShortName}>{d.DisplayName}</option>
                                                ))
                                            }
                                        </select>
                                    </FormGroup>
                                    {
                                        styleList.length !== 0 ? 
                                            <FormGroup>
                                                <Label>Speaking style</Label>
                                                <select value={style} onChange={handleStyleChange} className="form-control">
                                                    {
                                                        styleList.map((_st,i) => (
                                                            <option key={i} selected>{_st}</option>
                                                        ))
                                                    }
                                                </select>
                                            </FormGroup>:
                                            null
                                    }
                                    <FormGroup className="mb-3">
                                        <Label className="mb-3">Speaking rate(speed)</Label>
                                        <InputRange maxValue={100} minValue={10} step={10} value={speed} onChange={handleSpeedChange} />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <Label className="mb-3">Speaking Volume</Label>
                                        <InputRange maxValue={100} minValue={10} step={10} value={volume} onChange={handleVolumeChange} />
                                    </FormGroup>
                                </Form>
                                <div className="mt-4">
                                    <audio src={filePath} ref={audioRef}></audio>
                                    {
                                    !loading ? 
                                        <Button color="info" onClick={handleSubmit}>Play</Button> : 
                                        <Button >Processing...</Button>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>          
        </div>
    )
}

export default TextToSpeech
