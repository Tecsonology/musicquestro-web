import Soundfont from 'soundfont-player'

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const instruments = {};

    async function loadInstrument(name) {
      if (!instruments[name]) {
        instruments[name] = await Soundfont.instrument(audioCtx, name);
      }
      return instruments[name];
    }

    export async function playInstrument(name, note = "C4", duration = 2) {
      const inst = await loadInstrument(name);
      inst.play(note, audioCtx.currentTime, { duration });
    }