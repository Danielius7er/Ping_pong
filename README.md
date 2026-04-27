# Jogo Pong 🎮

Uma implementação clássica do jogo Pong usando HTML5, CSS3 e JavaScript puro (vanilla) com um oponente de IA em tempo real.

## Funcionalidades ✨

- **Jogabilidade Jogador vs. Computador**: Controle a raquete esquerda para competir contra um oponente de IA inteligente.
- **Métodos de Controle Duplos**: 
  - Rastreamento da posição Y do mouse para um controle suave da raquete.
  - Teclas de Seta (↑ Cima / ↓ Baixo) para controle alternativo.
- **Motor de Física Avançado**:
  - Rebatida de bola realista com detecção de colisão nas paredes.
  - Colisão na raquete com mecânica de efeito (spin).
  - Progressão da velocidade da bola.
- **Oponente de IA Inteligente**: Raquete do computador com dificuldade média e atrasos de reação.
- **Placar em Tempo Real**: Acompanhamento de pontuação ao vivo para o jogador e para o computador.
- **Efeitos Visuais**:
  - Interface temática em Neon com efeitos de brilho (*glow*).
  - Animações e transições suaves.
  - Raquetes e bola coloridas.
- **Controles do Jogo**:
  - Funcionalidade de Iniciar/Parar o jogo.
  - Botão para reiniciar a pontuação.
  - Pausa ao interromper o jogo.

## Como Jogar 🕹️

1. Abra o arquivo `index.html` no seu navegador.
2. Clique no botão **"Start Game"** para começar.
3. Controle sua raquete esquerda usando:
   - **Mouse**: Mova o cursor para cima/para baixo.
   - **Teclas de Seta**: Pressione ↑ (Cima) ou ↓ (Baixo).
4. Tente fazer a bola passar pela raquete do computador para marcar pontos.
5. O primeiro a atingir a pontuação alvo vence! (ou apenas divirta-se!)

## Regras do Jogo 📋

- A raquete esquerda é controlada pelo jogador.
- A raquete direita é controlada pela IA do computador.
- A bola rebate nas paredes superior e inferior.
- Um ponto é marcado quando o oponente não consegue rebater a bola.
- A velocidade da bola aumenta ligeiramente a cada rebatida na raquete.
- O efeito da bola é aplicado com base no local onde ela atinge a raquete.

## Arquivos 📁

- `index.html` - Estrutura HTML do jogo.
- `style.css` - Estilização e animações.
- `script.js` - Lógica do jogo e motor de física.
- `README.md` - Este arquivo.

## Compatibilidade de Navegadores 🌐

- Chrome (última versão)
- Firefox (última versão)
- Safari (última versão)
- Edge (última versão)

## Melhorias Futuras 🚀

- Seletor de níveis de dificuldade.
- Efeitos sonoros.
- Recurso de pausa dedicado.
- Modo multijogador local para dois jogadores.
- Controles de toque para dispositivos móveis.
- Persistência de recordes com `localStorage`.

## Licença 📄

Este projeto é de código aberto e está disponível para fins educacionais.

---

**Divirta-se jogando Pong! 🎮🎉**
