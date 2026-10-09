const playlist = [
      {
        titulo: "Beautiful Things",
        artista: "Benson Boone",
        capa: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
        arquivoAudio: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
      },
      {
        titulo: "Slow Hands",
        artista: "Niall Horan",
        capa: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
        arquivoAudio: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=chill-abstract-intention-12099.mp3"
      }
    ];

    let indiceMusicaAtual = 0;
    let estaTocando = false;

    const audio = document.getElementById('audio-player');
    const capaAlbum = document.getElementById('capa-album');
    const tituloMusica = document.getElementById('titulo-musica');
    const nomeArtista = document.getElementById('nome-artista');
    
    const badgePonto = document.getElementById('ponto-status');
    const badgeTexto = document.getElementById('texto-status');
    
    const barraProgresso = document.getElementById('barra-progresso');
    const textoTempoAtual = document.getElementById('tempo-atual');
    const textoTempoTotal = document.getElementById('tempo-total');
    
    const btnPlay = document.getElementById('btn-play');
    const iconePlay = document.getElementById('icone-play');
    const btnVoltar = document.getElementById('btn-voltar');
    const btnAvancar = document.getElementById('btn-avancar');

    function carregarMusica(indice) {
      const musica = playlist[indice];
      
      tituloMusica.textContent = musica.titulo;
      nomeArtista.textContent = musica.artista;
      capaAlbum.src = musica.capa;
      audio.src = musica.arquivoAudio;
      
      barraProgresso.value = 0;
      textoTempoAtual.textContent = "0:00";
    }

    function tocarMusica() {
      audio.play();
      estaTocando = true;
      
      iconePlay.className = "fa-solid fa-pause";
      badgePonto.className = "w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse";
      badgeTexto.textContent = "Tocando";
    }

    function pausarMusica() {
      audio.pause();
      estaTocando = false;
      
      iconePlay.className = "fa-solid fa-play ml-1";
      badgePonto.className = "w-2.5 h-2.5 rounded-full bg-amber-400";
      badgeTexto.textContent = "Pausado";
    }

    function formatarTempo(segundos) {
      if (isNaN(segundos)) return "0:00";
      const minutos = Math.floor(segundos / 60);
      const segsRestantes = Math.floor(segundos % 60);
      return `${minutos}:${segsRestantes < 10 ? '0' : ''}${segsRestantes}`;
    }

    btnPlay.addEventListener('click', () => {
      if (estaTocando) {
        pausarMusica();
      } else {
        tocarMusica();
      }
    });

    btnVoltar.addEventListener('click', () => {
      indiceMusicaAtual = (indiceMusicaAtual - 1 + playlist.length) % playlist.length;
      carregarMusica(indiceMusicaAtual);
      tocarMusica();
    });

    btnAvancar.addEventListener('click', () => {
      indiceMusicaAtual = (indiceMusicaAtual + 1) % playlist.length;
      carregarMusica(indiceMusicaAtual);
      tocarMusica();
    });

    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        const porcentagem = (audio.currentTime / audio.duration) * 100;
        barraProgresso.value = porcentagem;
        textoTempoAtual.textContent = formatarTempo(audio.currentTime);
        textoTempoTotal.textContent = formatarTempo(audio.duration);
      }
    });

    barraProgresso.addEventListener('input', () => {
      if (audio.duration) {
        const novoTempo = (barraProgresso.value / 100) * audio.duration;
        audio.currentTime = novoTempo;
      }
    });

    audio.addEventListener('ended', () => {
      indiceMusicaAtual = (indiceMusicaAtual + 1) % playlist.length;
      carregarMusica(indiceMusicaAtual);
      tocarMusica();
    });

    carregarMusica(indiceMusicaAtual);