import React from 'react';
import './ChatIntro.scss';

export default () => {
    return(
        <div className='chatintro'>
            
            <figure className='chatintro__holder-img'>
                <img src="./images/intro-connection-light_c98cc75f2aa905314d74375a975d2cf2.jpg" alt="" />
            </figure>

            <h1 className='chatintro__title'>Mantenha seu celular conectado</h1>
            <p className='chatintro__text'>O WhatsApp conecta ao seu celular para sincronizar suas mensagens. Para reduzir o uso de dados, conecte seu celular a uma rede Wi-Fi.</p>
            <p className='chatintro__text'>Faça chamadas a partir de um computador com o WhatsApp para Windows. <a href="https://www.whatsapp.com/download" target="_blank">Baixe aqui</a></p>
        </div>
    )
}