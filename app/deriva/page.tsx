"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { ArrowRightIcon } from "../components/ui/icons";

const DERIVAS = [
  {
    numero: "01",
    principal: "ande até a sombra mais comprida que você conseguir ver.",
    secundaria:
      "se ela mudar de tamanho antes de você chegar, volte ao ponto de onde você saiu.",
  },
  {
    numero: "02",
    principal: "encontre um lugar onde duas sombras se cruzam.",
    secundaria:
      "fique parado exatamente sobre esse cruzamento por 90 segundos.",
  },
  {
    numero: "03",
    principal: "siga a sombra de alguém que você não conhece.",
    secundaria: "não a pessoa, apenas a sombra. pare quando ela desaparecer.",
  },
  {
    numero: "04",
    principal: "vire na próxima rua que tiver um relógio visível.",
    secundaria:
      "se o relógio estiver em um número ímpar, vire mais uma vez na direção que o número indica.",
  },
  {
    numero: "05",
    principal: "espere um minuto completo sem se mover.",
    secundaria:
      "a próxima direção será determinada pelo primeiro som que você ouvir depois disso.",
  },
  {
    numero: "06",
    principal: "ande na velocidade que este bairro teria tido há 50 anos.",
    secundaria: "se não souber qual velocidade é essa, invente.",
  },
  {
    numero: "07",
    principal:
      "ande com o queixo voltado para baixo até encontrar algo interessante no chão.",
    secundaria: "isso vai te dizer a próxima direção.",
  },
  {
    numero: "08",
    principal: "dê exatamente 16 passos em linha reta.",
    secundaria: "vire 90 graus na direção do seu coração — à esquerda.",
  },
  {
    numero: "09",
    principal: "ande até sentir um cheiro diferente.",
    secundaria: "siga na direção de onde o cheiro parece vir.",
  },
  {
    numero: "10",
    principal: "feche os olhos por 5 segundos.",
    secundaria: "ao abrir, vá na direção que seu corpo já estava inclinado.",
  },
  {
    numero: "11",
    principal:
      "ignore a próxima rua larga. entre pela mais estreita que você encontrar.",
    secundaria: "ruas largas pertencem ao espetáculo e a funâmbulos.",
  },
  {
    numero: "12",
    principal: "vire toda vez que uma placa de trânsito mandar você ir reto.",
    secundaria: "obedeça apenas os sinais que ninguém mais obedece.",
  },
  {
    numero: "13",
    principal: "tome o caminho mais longo entre dois pontos visíveis.",
    secundaria: "a linha reta é uma convenção burguesa.",
  },
  {
    numero: "14",
    principal: "entre no próximo estabelecimento que tiver a porta aberta.",
    secundaria: "olhe ao redor por 30 segundos. saia. continue.",
  },
  {
    numero: "15",
    principal:
      "observe o próximo animal que você ver — pássaro, cachorro, gato, inseto.",
    secundaria:
      "siga a direção em que ele estava olhando quando você o notou.",
  },
  {
    numero: "16",
    principal: "escute a conversa mais próxima.",
    secundaria:
      "a última palavra que você entender determina: par = esquerda, ímpar de sílabas = direita.",
  },
  {
    numero: "17",
    principal: "espere pela próxima pessoa que usar vermelho.",
    secundaria: "siga na direção contrária à que ela for.",
  },
  {
    numero: "18",
    principal: "conte os próximos veículos que passarem.",
    secundaria:
      "se for número par, vire à esquerda. ímpar, à direita. zero, siga em frente.",
  },
  {
    numero: "19",
    principal: "abra um contato aleatório do seu celular.",
    secundaria:
      "o nome dessa pessoa determina sua rota: vogal inicial = avance, consoante = vire.",
  },
  {
    numero: "20",
    principal: "vá até o edifício mais feio da sua linha de visão.",
    secundaria: "toque nele com a mão. depois vire na direção oposta.",
  },
  {
    numero: "21",
    principal: "encontre uma janela com luz acesa durante o dia.",
    secundaria:
      "o que estão ignorando lá dentro? siga pensando nisso enquanto anda.",
  },
  {
    numero: "22",
    principal: "procure a porta mais esquecida da rua.",
    secundaria:
      "aquela que claramente ninguém usa há meses. fique na frente dela por um momento.",
  },
  {
    numero: "23",
    principal: "ande paralelo a uma parede longa sem se afastar dela.",
    secundaria:
      "pare quando a parede acabar. aquele ponto é seu próximo ponto de partida.",
  },
  {
    numero: "24",
    principal: "encontre uma escada que sobe para algum lugar sem sentido.",
    secundaria:
      "não suba. apenas observe por onde ela desapareceria se continuasse.",
  },
  {
    numero: "25",
    principal: "procure um lugar que nunca recebe sol direto.",
    secundaria: "ande por ele vagarosamente. anote como o ar parece diferente.",
  },
  {
    numero: "26",
    principal: "encontre algo que claramente ainda existe por inércia.",
    secundaria:
      "uma loja obsoleta, um poste pintado mil vezes. dê a volta ao redor dele.",
  },
  {
    numero: "27",
    principal: "ande de costas por 10 passos.",
    secundaria:
      "o que você viu durante esses 10 passos é o que este lugar quer te mostrar.",
  },
  {
    numero: "28",
    principal:
      "encontre um beco ou passagem que parece não levar a lugar nenhum.",
    secundaria:
      "entre até onde se sentir confortável. volte. a rua que você retornar é a nova rota.",
  },
  {
    numero: "29",
    principal: "observe o próximo número de endereço que você enxergar.",
    secundaria: "some os dígitos. par: vire. ímpar: continue. 0: você chegou.",
  },
  {
    numero: "30",
    principal: "procure um espelho em alguma fachada ou vitrine.",
    secundaria:
      "a cidade que você vê refletida é o mapa para os próximos 5 minutos.",
  },
];

export default function Deriva() {
  const [index] = useState(() =>
    Math.floor(Math.random() * DERIVAS.length)
  );

  const deriva = DERIVAS[index];

  useEffect(() => {
    sessionStorage.setItem("deriva_numero", deriva.numero);
    sessionStorage.setItem("deriva_principal", deriva.principal);
  // index is fixed on mount — effect runs once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#d9d7d2] sm:px-6 sm:py-6">
      <section className="relative mx-auto flex min-h-[851px] w-full sm:max-w-[390px] flex-col bg-[#fdfcf9] shadow-[0_10px_35px_rgba(0,0,0,0.14)]">

        <div className="flex flex-1 flex-col justify-between px-6 pb-6 pt-6">

          {/* Top: instrução + total */}
          <div className="flex items-end justify-between">
            <div>
              <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-[#1a1a18]/55">
                instrução
              </p>
              <p className="font-serif text-[26px] leading-[26px] text-[#1a1a18]">
                {deriva.numero}
              </p>
            </div>
            <div className="text-right">
              <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-[#1a1a18]/55">
                total
              </p>
              <p className="font-serif text-[18px] leading-[18px] text-[#1a1a18]/55">
                30
              </p>
            </div>
          </div>

          {/* Instrução principal */}
          <div className="flex flex-col gap-6">
            <h2
              className="font-serif text-[#1a1a18]"
              style={{
                fontSize: "44px",
                lineHeight: "42.24px",
                letterSpacing: "-1.32px",
                fontWeight: 400,
              }}
            >
              {(() => {
                const text = deriva.principal.replace(/\.$/, "");
                const lastSpace = text.lastIndexOf(" ");
                const before = text.slice(0, lastSpace + 1);
                const last = text.slice(lastSpace + 1);
                return (
                  <>
                    {before}
                    <span className="text-[#c8382a]">{last}</span>
                    {"."}
                  </>
                );
              })()}
            </h2>

            <p
              className="font-editorial italic text-[#333333]"
              style={{ fontSize: "14px", lineHeight: "15px" }}
            >
              {deriva.secundaria}
            </p>
          </div>

          {/* Bottom actions */}
          <div className="flex flex-col gap-0">
            <Link
              href="/registro"
              className="group flex h-[56px] w-full items-center justify-between border-b border-t border-[#1a1a18] pl-1 pr-4 transition-colors duration-200 hover:border-[#c8382a]"
            >
              <span className="font-sans text-[12px] uppercase tracking-[0.28em] text-[#1a1a18] transition-colors duration-200 group-hover:text-[#c8382a]">
                cumprida
              </span>
              <ArrowRightIcon className="size-6 text-[#1a1a18] transition-colors duration-200 group-hover:text-[#c8382a]" />
            </Link>

            <div className="flex items-center gap-6 pt-5">
              <Link
                href="/teoria"
                className="flex items-center gap-2 text-[#1a1a18]/70 transition-opacity hover:opacity-100"
              >
                <span className="font-sans text-[9px] leading-none">←</span>
                <span className="font-sans text-[9px] uppercase tracking-[0.28em]">
                  encerrar deriva
                </span>
              </Link>
            </div>
          </div>
        </div>

        <Navbar active="II" />

      </section>
    </main>
  );
}
