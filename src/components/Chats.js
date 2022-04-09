import React, {useRef, useState, useEffect} from "react";
import {useHistory} from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import {auth} from '../firebase'
import { useAuth } from "../context/AuthContext";
import axios from "axios";
const Chats = () => {
    const history = useHistory()
    const {user} = useAuth() 
    const [loading, setLoading] = useState(true)
    async function handleLogout(){
        await auth.signOut()
        history.push("/")
    }
    
    const getFile = async (url) => {
        const response = await fetch(url)
        const data = await response.blob()
        return new File([data], "userPhoto.jpg", {type : "image/jpeg"})
    }
    useEffect(() => {
        if(!user){
            history.push('/');
            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers : {
                "project-id" : "edab820a-e8fe-45d3-919d-63c66fd2bf0e",
                "user-name" : user.displayName,
                "user-secret" : user.uid,
            }
        }).then(() => setLoading(false)) 
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email)
            formdata.append('username', user.displayName)
            formdata.append('secret', user.uid)
            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name)
                    axios.post('https://api.chatengine.io/users',
                    formdata,
                    {headers : {"private-key" : "d35a6f43-e813-41b1-9b40-ed395e370047"}})
                    .then(() => setLoading(false))
                    .catch(e => console.log(e))
                })

        })
    }, [user, history])
    if(!user || loading) return 'Loading'
    return <div className="chats-page">
        <div className="nav-bar">
            <div className="logo-tab">
                Unichat
            </div>
            <div onClick={handleLogout} className="logout-tab">
                Logout
            </div>
        </div>
        <ChatEngine 
            height="calc(100vh-66px)"
            projectID="edab820a-e8fe-45d3-919d-63c66fd2bf0e"
            userName={user.displayName}
            userSecret={user.uid}
        />
    </div>
}

export default Chats