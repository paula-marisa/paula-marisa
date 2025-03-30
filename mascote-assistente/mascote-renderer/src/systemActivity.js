import activeWin from 'active-win';

export async function getEstadoPorApp() {
    const active = await activeWin();

    if (!active || !active.owner || !active.owner.name) return 'sad';

    const app = active.owner.name.toLowerCase();

    if (app.includes('spotify') || app.includes('music')) return 'musica';
    if (app.includes('vlc') || app.includes('video') || app.includes('movies')) return 'filme';
    if (app.includes('game') || app.includes('steam')) return 'jogar';
    if (app.includes('explorer')) return 'procurar';
    if (app.includes('chrome') || app.includes('firefox') || app.includes('edge') || app.includes('msedge')) return 'pensar';

    // Apps de escrita: Word, Excel, PowerPoint, Notepad, Adobe, VSCode
    const escrita = ['winword', 'excel', 'powerpnt', 'acrobat', 'notepad', 'code'];
    if (escrita.some(name => app.includes(name))) return 'escrever';

    return 'sad'; // app não reconhecida
}
