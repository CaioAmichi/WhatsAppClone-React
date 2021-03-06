import {React, useState, useEffect} from "react";
import './App.css';

import ChatListItem from './Components/CharListItem.js/index'
import ChatIntro from "./Components/ChatIntro/index";
import ChatWindow from "./Components/ChatWindow";
import NewChat from "./Components/NewChat";


import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import Login from "./Components/Login";
import Api from "./Api";


export default () => {

  const[chatList, setChatList] = useState([])
  const[activeChat, setActiveChat] = useState({});
  const [showNewChat, setShowNewChat] = useState(false)
  const[user, setUser] = useState(null);
  
  useEffect(() => {
    
    if(user !== null){
        let unsub = Api.onChatList(user.id, setChatList);
        return unsub

    }
    
  }, [user])


  const handleNewChat = () => {
      setShowNewChat(true)
  }

  const handleLoginData = async (u) => {
      let newUser = {
        id: u.uid,
        name: u.displayName,
        avatar: u.photoURL
      }
      await Api.addUser(newUser)
      setUser(newUser)
  }

  if(user === null){

    return (<Login onReceive={handleLoginData} />);
  }

  return (


    <div className='app-window'>
      <div className='sidebar'>
        <NewChat
          
          chatlist={chatList}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
        />
        <header>
            <img className="header--avatar" src={user.avatar} alt="" />
            <div className="header--buttons">
              <div className="header--btn">
                    <DonutLargeIcon style={{color: '#919191'}}></DonutLargeIcon>
              </div>
              <div onClick={handleNewChat} className="header--btn">
                    <ChatIcon style={{color: '#919191'}}></ChatIcon>
              </div>
              <div className="header--btn">
                    <MoreVertIcon style={{color: '#919191'}}></MoreVertIcon>
              </div>
            </div>
        </header>

        <div className="search">
          <div className="search--input">
              <SearchIcon fontSize='small' style={{color:'#919191'}}></SearchIcon>
              <input type='search' placeholder="Procurar ou come??ar uma nova conversa"></input>
          </div>
        </div>

        <div className="chatlist">
            {chatList.map((item,key) =>(
              <ChatListItem 
              key={key}
              data={item}
              active={activeChat.chatId === chatList[key].chatId}
              onClick={()=> {
                console.log(chatList[key])
                setActiveChat(chatList[key])
                console.log(activeChat)}}
              />
            ))}



        </div>

      </div>

      <div className='contentarea'>
              
              {activeChat.chatId !== undefined &&
                  <ChatWindow

                  user = {user}
                  data = {activeChat}
                  />
              }
              {activeChat.chatId === undefined &&
                  <ChatIntro/>
              }
              
              
      </div>
    </div>

  )
}