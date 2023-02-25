import React from 'react'

export default function User({myKey, data, clickEvent}) {
  return (
    <div key={myKey}>
      <div className="userChat" onClick={()=>(clickEvent(data))}>
        <img src={data.photoURL} alt="" />
        <div className="userChatInfo">
        <span>{data.displayName}</span>
        </div>
    </div>
    </div>
  )
}
