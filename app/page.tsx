'use client'
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Carregando a animação de forma dinâmica, desabilitando a renderização do lado do servidor
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import plantaAnimation from '@/app/assets/animations/planta-animation.json';
import { Waves } from 'lucide-react';
import { stringify } from 'querystring';

export default function Home() {
  const mesagesStates = [
    {message: 'Só um instante...', submessage: 'Tentando comunicar com a Dona Planta...' },
    {message: 'Estou com sede 😓', submessage: 'Estou precisando muuuito de água! Me dê um pouco, por gentileza?' },
    {message: 'Estou começando a sentir sede... 👀', submessage: 'Minha água está acabando. Por favor, me dê um pocuo, mas sem pressa!' },
    {message: 'Estou satisfeita! 😃', submessage: 'No momento, meu solo ainda está bem úmido, não quero água por agora!' }
  ]

  const [umidade, setUmidade] = useState<number | null>(null);
  const [messageState, setMessageState] = useState<{message: string, submessage: string}>(mesagesStates[0]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      fetch('http://localhost:3001/umidade')
        .then((res) => res.json())
        .then((data) => {
          setUmidade(data.umidade);
          if(data.umidade && data.umidade < 600) {
            setMessageState(mesagesStates[3]);
          }
          else if(data.umidade && data.umidade >= 600 && data.umidade < 800) {
            setMessageState(mesagesStates[2]);
          } else {
            setMessageState(mesagesStates[1]);
          }
        });
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <main className="flex w-full h-screen p-8">
      <section className="w-full flex flex-row h-full">
        <div className="flex flex-1 flex-col pt-20">
          <h1 className="text-6xl font-bold text-gray-800">
            {messageState.message}
          </h1>
          <h3 className='mt-2 text-xl'>
          {messageState.submessage}
          </h3>
          
          <div className="flex flex-row items-center mt-4 gap-2">
            <Waves className='text-gray-600 w-5 h-5' />
            <span className='text-base text-gray-600'>
              Umidade do solo: {umidade !== null ? `${Number((100 - ((umidade / 1023) * 100)).toFixed(2))}%` : 'Carregando...'}
            </span>
          </div>
        </div>

        <div className="flex flex-1 justify-center items-center">
          <Lottie animationData={plantaAnimation} className='w-[90%] h-[90%]' loop autoplay />
        </div>
      </section>
    </main>
  );
}
