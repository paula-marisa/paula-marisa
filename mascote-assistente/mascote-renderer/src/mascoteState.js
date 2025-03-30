// GESTÃO DE ATIVIDADE/INATIVIDADE
export class MascoteStateManager {
    constructor(onActive, onInactive) {
        this.timeout = null;
        this.onActive = onActive;
        this.onInactive = onInactive;
        this.inactivityDelay = 120000; // 2 minutos

        this.resetInactivityTimer();
        this.listen();
    }

    resetInactivityTimer() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.onInactive(); // ✅ correção aqui
        }, this.inactivityDelay);
    }

    listen() {
        ['mousemove', 'keydown', 'mousedown'].forEach(event => {
            window.addEventListener(event, () => {
                this.onActive();
                this.resetInactivityTimer();
            });
        });
    }
}

// MAPA DE ESTADOS DA MASCOTE
export const estadosMascote = {
    pensar: 'ideia.glb',
    procurar: 'find.glb',
    escrever: 'writing.glb',
    filme: 'movie.glb',
    musica: 'music.glb',
    jogar: 'playing.glb',
    base: 'mascote.glb',
    inativo: 'sleep.glb',
    erro: 'sad.glb',
    sad: 'sad.glb'
};
