import React from 'react'

export default function User({myKey, data, clickEvent}) {
  let message = data?.lastMsg?.substr(0, 10)
  message = (message? (message+ ((data?.lastMsg?.length ?? 0) > 10 ? ".." : "" )): undefined)
  return (
      <div key={myKey} className="userChat" onClick={()=>(clickEvent(data.userInfo))}>
        <img src={data.userInfo.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{data.userInfo.displayName}</span>
          <p>{message}</p>
        </div>
    </div>
  )
}
