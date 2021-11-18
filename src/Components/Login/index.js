import {React} from "react";
import Api from "../../Api";
import './index.css';



export default ({onReceive}) => {
    
   const handleLoginFace = async () => {

    let result = await Api.fbPopup();
    
    if(result){
        onReceive(result.user)
    } else {
        alert('Erro!!!')
    }
   }
    
    
    return (
        <body>
            <div className="Logar">
             <button onClick={handleLoginFace} >Logar com Facebook</button>
            </div>
        </body>
    )
}