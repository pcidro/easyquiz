const respostas = document.getElementById("respostas");
const resultado = document.getElementById("resultado");
const feedback = document.getElementById("feedback");
const numeroPergunta = document.getElementById("numero-pergunta");
const pontuacao = document.getElementById("pontuacao");
const pergunta = document.getElementById("pergunta");
const quiz = document.getElementById("quiz");

let perguntaAtual = 0;
let pontos = 0;

const perguntas = [
  {
    pergunta: "Quantos lados tem um hexágono?",
    respostas: ["4", "5", "6", "8"],
    correta: 2,
  },
  {
    pergunta: "O que significa a sigla ONU?",
    respostas: [
      "Organização Nacional Unida",
      "Ordem Nacional Universal",
      "Organização das Nações Unidas",
      "Ordem das Nações Unidas",
    ],
    correta: 2,
  },
  {
    pergunta: "Quem pintou a obra 'A Última Ceia'?",
    respostas: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Van Gogh"],
    correta: 1,
  },

  {
    pergunta: "Qual é o maior animal do mundo?",
    respostas: [
      "Tubarão-baleia",
      "Baleia Jubarte",
      "Lula-gigante",
      "Baleia-azul",
    ],
    correta: 3,
  },

  {
    pergunta: "Em que continente fica o deserto do Saara?",
    respostas: ["Ásia", "África", "América do Sul", "Oceania"],
    correta: 1,
  },
  {
    pergunta: "Qual é o metal mais caro do mundo?",
    respostas: ["Ouro", "Platina", "Ródio", "Prata"],
    correta: 2,
  },
  {
    pergunta: "Qual é o maior mamífero terrestre?",
    respostas: [
      "Urso polar",
      "Elefante africano",
      "Girafa",
      "Rinoceronte branco",
    ],
    correta: 1,
  },

  {
    pergunta: "Quem foi o autor da obra 'Dom Quixote'?",
    respostas: [
      "William Shakespeare",
      "Miguel de Cervantes",
      "Fernando Pessoa",
      "Machado de Assis",
    ],
    correta: 1,
  },

  {
    pergunta: "Em que ano a Primeira Guerra Mundial começou?",
    respostas: ["1910", "1914", "1918", "1922"],
    correta: 1,
  },

  {
    pergunta:
      "Qual guerra foi iniciada pelo assassinato do arquiduque Francisco Ferdinando?",
    respostas: [
      "Primeira Guerra Mundial",
      "Segunda Guerra Mundial",
      "Guerra Franco-Prussiana",
      "Guerra do Vietnã",
    ],
    correta: 0,
  },
];

function mostrarPergunta() {
  atualizarStatus();
  let q = perguntas[perguntaAtual];
  pergunta.innerText = q.pergunta;
  respostas.innerHTML = "";

  const letras = ["A", "B", "C", "D"];
  q.respostas.forEach((resposta, indice) => {
    const btn = document.createElement("button");
    btn.classList.add("btn-respostas");
    btn.innerHTML = `<span>${letras[indice]}. ${resposta}</span>`;
    btn.addEventListener("click", () => verificarResposta(indice));
    respostas.appendChild(btn);
  });

  // Adiciona animação de entrada
  setTimeout(() => {
    const buttons = document.querySelectorAll(".btn-respostas");
    buttons.forEach((btn, index) => {
      btn.style.opacity = "0";
      btn.style.transform = "translateY(20px)";
      setTimeout(() => {
        btn.style.transition = "all 0.3s ease";
        btn.style.opacity = "1";
        btn.style.transform = "translateY(0)";
      }, index * 100);
    });
  }, 100);
}

function verificarResposta(indice) {
  let q = perguntas[perguntaAtual];

  const botoes = document.querySelectorAll(".btn-respostas");
  botoes.forEach((btn) => {
    btn.disabled = true;
    btn.classList.add("disabled");
  });

  feedback.innerHTML = "";
  const paragrafo = document.createElement("p");

  if (indice === q.correta) {
    paragrafo.innerText = "🎉 Acertou!";
    paragrafo.classList.add("acerto");
    pontos++;
  } else {
    paragrafo.innerText = `❌ Errou! Resposta correta: ${
      q.respostas[q.correta]
    }`;
    paragrafo.classList.add("erro");
  }

  feedback.appendChild(paragrafo);

  setTimeout(() => {
    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
      mostrarPergunta();
      feedback.innerHTML = "";
    } else {
      mostrarResultado();
    }
  }, 1500);
}

function atualizarStatus() {
  numeroPergunta.innerText = `Pergunta ${perguntaAtual + 1} de ${
    perguntas.length
  }`;
  pontuacao.innerText = `Pontuação: ${pontos}`;
}

function mostrarResultado() {
  quiz.style.display = "none";
  resultado.style.display = "block";

  const porcentagem = Math.round((pontos / perguntas.length) * 100);
  let emoji = "🤔";
  let mensagem = "";

  if (porcentagem >= 90) {
    emoji = "🏆";
    mensagem = "Excelente! Você é muito inteligente!";
  } else if (porcentagem >= 70) {
    emoji = "🎉";
    mensagem = "Muito bem! Você tem um bom conhecimento!";
  } else if (porcentagem >= 50) {
    emoji = "👍";
    mensagem = "Bom trabalho! Mandou bem até";
  } else {
    emoji = "🤔";
    mensagem = "Quem sabe da proxima vez?";
  }

  resultado.innerHTML = `
                <div style="font-size: 4rem; margin-bottom: 20px;">${emoji}</div>
                <div style="font-size: 1.8rem; font-weight: 700; margin-bottom: 15px; color: #2c3e50;">
                    Quiz Finalizado!
                </div>
                <div style="font-size: 1.3rem; margin-bottom: 10px; color: #34495e;">
                    Você acertou <strong style="color: #667eea;">${pontos}</strong> de <strong style="color: #764ba2;">${perguntas.length}</strong> perguntas
                </div>
                <div style="font-size: 1.1rem; margin-bottom: 25px; color: #7f8c8d;">
                    ${mensagem} (${porcentagem}%)
                </div>
            `;

  const btnReiniciar = document.createElement("button");
  btnReiniciar.innerHTML = "🔄 Reiniciar Quiz";
  btnReiniciar.addEventListener("click", () => {
    pontos = 0;
    perguntaAtual = 0;
    quiz.style.display = "block";
    resultado.style.display = "none";
    feedback.innerHTML = "";
    mostrarPergunta();
  });
  resultado.appendChild(btnReiniciar);
}

// Inicializa o quiz
mostrarPergunta();
