import React,{useState} from 'react'
import NetworkNotifier from './NetworkNotifier'
import Input from './components/textInput'

export default function Root() {
    
    const [email, setEmail] = useState({
        eleType: 'input',
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
    })

    const online=()=><div>Online</div>
    const offline=()=><div>Offline</div>
    return (
        // <div style={{width:'100%',height:'500px',position: 'absolute',}}>
        //     <Map/>
        // </div>
        <div>
            <NetworkNotifier HandleOnline={online} HandleOffline={offline}/>
            <input type='tel'/>
        </div>
    )
}
