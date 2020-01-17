import React,{useEffect,useState,Fragment} from 'react'

export default function NetworkNotifier({HandleOnline,HandleOffline}) {

    const [isOnline, setOnlineStatus] = useState(window.navigator.onLine)


    useEffect(() => {

        function handleOnlineStatus(event) {
            setOnlineStatus(window.navigator.onLine);
        }
    
        window.addEventListener("online", handleOnlineStatus);
        window.addEventListener("offline", handleOnlineStatus);
    
        return () => {
          window.removeEventListener("online", handleOnlineStatus);
          window.removeEventListener("offline", handleOnlineStatus);
        };
      }, []);

    

    return (
        <div>
            {
                isOnline?(HandleOnline?<HandleOnline/>:null):<HandleOffline/>
            }
        </div>
    )
}
