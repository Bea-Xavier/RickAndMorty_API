# 📱 Aplicativo temático de Rick and Morty

Esta é uma aplicação mobile desenvolvida *(em React Native com Expo)* para integrar com uma API gratuita e existente de Rick and Morty (documentação mais a baixo). Com o objetivo, de pegar as informações armazenadas no banco de dados disponível da API, e retornar as informações sobre os personagens referentes a série. Além disso, o app é totalmente personalizado com cores e elementos referentes a série temática.

---

## ⚙️ Funcionalidades do sistema

A aplicação possuí uma lógica de programação ao qual, interage com as informações armazenadas e ofericidas pela a API e as manipula para então dentro do aplicativo ser possível:

💠 **Exibição listada de todos os personagens da série (até aqueles episódios a qual a API foi alimentada);**

💠 **Interação com cards de exibição dos personagens, ao qual ser clicado, leva a uma página que detalha as informações referentes aquele personagem em específico;**

💠 **Navegação interativa entre todas as páginas que são fornececidas pela a API;**

💠 **Barra de busca, que é possível filtrar o nome de um personagem (ou mais que contém nomes semelhantes), e retorná-lo(s) para exibição.**

---

## 🖥️ Primeiros passos

◼️ 1. Antes de baixar o arquivo do projeto e rodar o aplicativo, será necessário ter o [*Node.js*](https://nodejs.org/en) instalado na sua máquina. 

◼️ 2. Depois disso é só copiar o link do repositório, abrir o terminal (ou um prompt de comando de sua escolha) e por fim, tendo o *git* baixado em sua máquina digitar o seguinte comando: 

```bash
git clone https://github.com/Bea-Xavier/RickAndMorty_API.git 
```

◼️ 3. Abra o ambiente de desenvolvimento de sua preferência, e entre na pasta do projeto:
```bash
cd Rick_and_Morty_API
```

Após esses passos, você precisará ter o aplicativo *Expo Go* instalado em seu telefone celular, pois é por ele que vamos testar o projeto.

---

## 🛠️ Utilizando o Expo e baixando dependências

Depois de ter instaldo o Node.js em sua máquina, ter o repositório em mãos, e ter o Expo Go em seu celular, agora precisaremos baixar os arquivos .expo para tornar o projeto executável para você!

📁 1. Dentro da pasta do repositótio, no terminal digite:

```bash
npm install -g expo-cli
```
🔧 2. Em seguida, baixe as dependências necessárias:

```bash
npm install 
```

▶ 3. Aguarde tudo ser instalado corretamente, e então de o seguinte comando para *inicializar o projeto*: 

```bash
npx expo start --tunnel
```

📲 4. Isso irá gerar um QR Code, que com o aplicativo Expo Go aberto em seu celular você irá escanea-lo.

--- 

## 📎 Considerações finais

Pronto! Com todos os passos seguidos corretamente, você já estará pronto para utilizar o projeto App Rick and Morty - API!

---

## 👩‍💻 Autora

*Nome:* [Beatriz V. Xavier](https://github.com/Bea-Xavier)

*Tecnologias:* 

💠 React Native
💠 Expo

[![My Skills](https://skillicons.dev/icons?i=git,js,npm,vscode&theme=dark)](https://skillicons.dev)

---

## 📄 Licença

Documentação da API de Rick and Morty utilizada: https://rickandmortyapi.com/documentation 🦠

Este projeto é apenas para fins acadêmicos e de estudo. 🚀
