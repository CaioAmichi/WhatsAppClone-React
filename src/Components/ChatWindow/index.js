import { React, useState, useEffect, useRef } from "react";
import './index.css';
import EmojiPicker from "emoji-picker-react";
import MessageItem from "../MessageItem";
import DropZone from "../DropZone";
import Api from "../../Api";



import SearchIcon from "@material-ui/icons/Search";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import InsertEmoticon from "@material-ui/icons/InsertEmoticon";
import Close from "@material-ui/icons/Close";
import Mic from "@material-ui/icons/Mic";
import Send  from "@material-ui/icons/Send";









export default ({user, data}) => {

    const body = useRef();

    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if(SpeechRecognition !== undefined){
        recognition = new SpeechRecognition
    }
    const [emojiOpen, setEmojiOpen] = useState(false)
    const [imageOpen, setImageOpen] = useState(false)
    const [text, setText] = useState("")
    const [listening, setListening] = useState(false)
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])
    const [selectedFile, setSelectedFile] = useState()

    useEffect(() => {

        setList([]);
        let unsub = Api.onChatContent(data.chatId, setList, setUsers)
        return unsub

    }, [data.chatId])

    useEffect(() => {
        if(body.current.scrollHeight > body.current.offsetHeight){
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight
        }
    }, [list])


    const handleEmojiClick = (e, emojiObject) => {
        console.log('entrou')    
        setText(text + emojiObject.emoji)
    }
    
    const handleOpenEmojiClick = () => {
        setImageOpen(false)
        setEmojiOpen(true)
    }

    const handleCloseEmojiClick = () => {
        setEmojiOpen(false)
    }

    const handleOpenImageClick = () => {
        setEmojiOpen(false)
        setImageOpen(true)
        
    }
    const handleCloseImageClick = () => {
        setImageOpen(false)
    }



    const handleMicClick = () => {
        console.log('entra aqui')
        console.log(recognition)
        if(recognition !== null){

            recognition.onstart = () => {
                setListening(true)
            }
            recognition.onend = () => {
                setListening(false)
            }
            recognition.onresult = (e) => {
                setText(e.results[0][0].transcript)
            }

            recognition.start()

        }
    }


    
    const handleInputKeyUp = (e) => {
        if(e.keyCode == 13){
            handleSendClick()
        }
        
    }

    const handleSendClick = () => {
        if(text !== ''){
           
            console.log('entrei aqui')
            console.log(selectedFile)
            Api.sendMessage(data, user.id,'text',text, users, selectedFile)
            setText('')
            setEmojiOpen(false)
            setImageOpen(false)
            setSelectedFile(undefined)

        }
    }
    



    return (
        <div className="chatWindow">
            <div className="chatWindow--header">
                <div className="chatWindow--headerinfo">
                    <img className="chatWindow--avatar" src={data.image} />
                    <div className="chatWindow--name">{data.title}</div>
                </div>

                <div className="chatWindow--headerbuttons">

                    <div className="chatWindow--btn">
                        <SearchIcon style={{ color: '#919191' }} />
                    </div>
                    <div className="chatWindow--btn">
                        <MoreVert style={{ color: '#919191' }} />
                    </div>
                </div>
            </div>
            <div ref={body} className="chatWindow--body">
                    {list.map((item,key) => (
                        <MessageItem
                            key = {key}
                            data = {item}
                            user = {user}
                    />
                    ))}
            </div>

            <div className="chatWindow--emojiarea" style={{height: emojiOpen ? '200px': '0px'}}>
                 <EmojiPicker
                    onEmojiClick = {handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                    
                 />
            </div>

            <div className="chatWindow--emojiarea" style={{height: imageOpen ? '200px': '0px'}}>
                <DropZone onFileUploaded = {setSelectedFile}/>
            </div>  

            <div className="chatWindow--footer">

                <div className="chatWindow--pre">
                    <div className="chatWindow--btn" onClick={imageOpen? handleCloseImageClick : handleOpenImageClick} style={{}}>
                        <AttachFile style={{ color: imageOpen? '#009688':'#919191' }}  />
                    </div>
                    <div className="chatWindow--btn" onClick={handleCloseEmojiClick} style={{width: emojiOpen?40:0}}>
                        <Close style={{ color: '#919191' }}  />
                    </div>
                    <div className="chatWindow--btn" onClick={handleOpenEmojiClick} style={{}}>
                        <InsertEmoticon style={{ color: emojiOpen? '#009688':'#919191' }}  />
                    </div>
                </div>
                <div className="chatWindow--inputarea">
                    <input 
                    className="chatWindow--input" 
                    type="text" 
                    placeholder="Digite algo..." 
                    value={text}
                    onChange={e=>setText(e.target.value)}
                    onKeyUp={handleInputKeyUp}
                    />

                </div>
                <div className="chatWindow--pos">
                    
                    { text === '' &&
                    <div onClick={handleMicClick} className="chatWindow--btn">
                        <Mic style={{ color:listening? '#126ECE' : '#919191' }} />
                    </div>
                    }
    
                    { text !== ''  &&
                    <div onClick={handleSendClick} className="chatWindow--btn">
                        <Send style={{ color:'#919191' }} />
                    </div>
                    }
                       
                </div>

            </div>
        </div >
    )
}