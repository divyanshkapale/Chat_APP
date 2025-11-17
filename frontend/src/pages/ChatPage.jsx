import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const ChatPage = () => { 
  const { logout } = useAuthStore();
  return (
    <div className="relative z-[100]">
      <button onClick={logout}>Logout</button>
    </div>
  )
}


export default ChatPage
