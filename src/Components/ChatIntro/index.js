import {React} from "react";
import './index.css';
import ImgIntro from '../../assets/whatsapp-intro.png'


export default () => {
    return (
        <div className="chatIntro">
            <img src={ImgIntro} alt=""/>
            <h1>Mantenha o celular conectado</h1>
            <h2>O WhatsApp conecta seu telefone para sicronizar suas mensagen.Para reduzir o uso de dados,conecte seu telefone a uma rede Wi-Fi.</h2>

        </div>
    )
}