import React from 'react'
import InfinteScroll from '../screens/infiniteScroller'

export const Landing=(props)=>(
        <div>
            <h2>Task Engine</h2>
            <button onClick={()=>props.history.push('/login')}>Login</button>
            <InfinteScroll/>
        </div>
    )





