# Jogo de Perguntas e Respostas - Trivia Game

Este é um jogo de perguntas e respostas baseado no jogo Trivia, semelhante ao show do milhão americano, desenvolvido utilizando React e Redux. O objetivo é colocar em prática os conceitos aprendidos sobre React e Redux, ao mesmo tempo em que se pratica a organização de um projeto em equipe com a metodologia Agile Kanban.

## Descrição

O app consiste em um jogo de perguntas e respostas em que o jogador deve responder a uma série de perguntas dentro de um limite de tempo. Cada acerto concede pontos ao jogador, que são exibidos em um placar no header da aplicação. Após responder a 5 perguntas, o jogador é redirecionado para uma tela de pontuação, onde o texto exibido varia de acordo com o número de acertos.

Além disso, o jogo permite ao jogador configurar algumas opções em uma tela de configurações acessível a partir do header do app.

## Funcionalidades

- Tela de início: O jogo começa com uma tela na qual o jogador insere seu nome e e-mail. O e-mail é usado para buscar a foto associada no site Gravatar, se houver.

- Jogo de perguntas e respostas: O jogador deve escolher uma das respostas disponíveis para cada uma das perguntas. A resposta deve ser marcada antes do contador de tempo chegar a zero; caso contrário, a resposta é considerada errada.

- Pontuação: Cada acerto concede pontos ao jogador, que são exibidos no header da aplicação.

- Tela de pontuação: Após responder a 5 perguntas, o jogador é redirecionado para uma tela de pontuação, onde o texto exibido depende do número de acertos.

- Ranking: Ao final de cada jogo, o jogador pode acessar o ranking com as melhores pontuações.

- Tela de configurações: O jogador pode configurar algumas opções para o jogo em uma tela de configurações acessível a partir do header do app.

## Organização do Projeto

O projeto foi estruturado em componentes React, seguindo as melhores práticas para manter o código legível, fácil de manter e expandir. As demandas foram divididas entre os membros do grupo, e a arquitetura do projeto foi definida com antecedência para garantir o bom andamento do trabalho.

## Testes

O projeto possui uma suíte de testes robusta com alta cobertura. Cada funcionalidade desenvolvida possui testes unitários para garantir a qualidade do código.

## Instalação

Para executar o projeto em sua máquina local, siga as etapas abaixo:

1. Clone o repositório: `git clone git@github.com:andradedgvictor/trivia.git`
2. Instale as dependências: `npm install`
3. Execute o projeto: `npm start`

## Equipe

- Víctor Andrade
- Lucas Alves
- Iris Xavier
- Claudia Freitas
- Vinicius Santos

## Contato

Se tiver alguma dúvida ou sugestão, entre em contato comigo pelo email ou linkedin.

[<img src="https://github.com/andradedgvictor/trivia/blob/main/public/outlook.png?raw=true" width="70" height="70" style="border-radius:50%">](mailto:victorandrademg@outlook.com)
[<img src="https://github.com/andradedgvictor/trivia/blob/main/public/linkedin.jpg?raw=true" width="70" height="70" style="border-radius:50%">](https://www.linkedin.com/in/andradedgvictor)