// Romantic Web Audio API Synthesizer (Instant fallback when MP3 is absent or autoplay restricted)
class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private gainNode: GainNode | null = null;
  private audioEl: HTMLAudioElement | null = null;
  private useSynthesizer: boolean = false;

  constructor() {
    // will be lazily initialized on user interaction
  }

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0.18, this.ctx.currentTime);
        this.gainNode.connect(this.ctx.destination);
      }
    }
  }

  public async start(mp3Src?: string): Promise<boolean> {
    this.initContext();

    if (this.ctx && this.ctx.state === "suspended") {
      await this.ctx.resume();
    }

    // Try playing the mp3 file first if provided
    if (mp3Src) {
      if (!this.audioEl) {
        this.audioEl = new Audio(mp3Src);
        this.audioEl.loop = true;
        this.audioEl.volume = 0.45;
      } else if (!this.audioEl.src.endsWith(mp3Src)) {
        this.audioEl.src = mp3Src;
      }

      try {
        await this.audioEl.play();
        this.isPlaying = true;
        this.useSynthesizer = false;
        return true;
      } catch {
        // Fallback to Web Audio romantic synth
        this.useSynthesizer = true;
      }
    } else {
      this.useSynthesizer = true;
    }

    if (this.useSynthesizer && this.ctx) {
      this.isPlaying = true;
      this.startMelodyLoop();
      return true;
    }

    return false;
  }

  public stop() {
    this.isPlaying = false;
    if (this.audioEl) {
      this.audioEl.pause();
    }
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(mp3Src?: string): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start(mp3Src);
      return true;
    }
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }

  // Romantic music box / soft piano chord sequence
  private playNote(frequency: number, duration: number, delay: number, volume: number = 0.12) {
    if (!this.ctx || !this.gainNode || !this.isPlaying) return;

    const now = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Soft warm chime / electric piano tone
    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, now);

    // Filter for warmth
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, now);

    // Natural bell/piano envelope: instant attack, long gentle decay
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(volume, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  // Evocative progression (Fmaj7 -> Cmaj7 -> Dm7 -> Am9 -> Bbmaj7 -> C7)
  private startMelodyLoop() {
    if (!this.isPlaying) return;

    // Freq map: C4=261.63, E4=329.63, F4=349.23, G4=392.00, A4=440.00, B4=493.88, C5=523.25, E5=659.25, F5=698.46, G5=783.99, A5=880.00
    const sequence = [
      // Fmaj7 arpeggio
      { f: 174.61, d: 2.5, t: 0.0, v: 0.14 }, // F3
      { f: 349.23, d: 1.8, t: 0.3, v: 0.10 }, // F4
      { f: 440.00, d: 1.8, t: 0.6, v: 0.11 }, // A4
      { f: 523.25, d: 2.0, t: 0.9, v: 0.12 }, // C5
      { f: 659.25, d: 2.4, t: 1.2, v: 0.13 }, // E5

      // Cmaj7 arpeggio
      { f: 130.81, d: 2.5, t: 2.2, v: 0.14 }, // C3
      { f: 261.63, d: 1.8, t: 2.5, v: 0.10 }, // C4
      { f: 329.63, d: 1.8, t: 2.8, v: 0.11 }, // E4
      { f: 392.00, d: 2.0, t: 3.1, v: 0.11 }, // G4
      { f: 493.88, d: 2.4, t: 3.4, v: 0.13 }, // B4

      // Dm7 arpeggio
      { f: 146.83, d: 2.5, t: 4.4, v: 0.14 }, // D3
      { f: 293.66, d: 1.8, t: 4.7, v: 0.10 }, // D4
      { f: 349.23, d: 1.8, t: 5.0, v: 0.11 }, // F4
      { f: 440.00, d: 2.0, t: 5.3, v: 0.12 }, // A4
      { f: 523.25, d: 2.4, t: 5.6, v: 0.13 }, // C5

      // Am9 / Em arpeggio
      { f: 110.00, d: 2.5, t: 6.6, v: 0.14 }, // A2
      { f: 220.00, d: 1.8, t: 6.9, v: 0.10 }, // A3
      { f: 329.63, d: 1.8, t: 7.2, v: 0.11 }, // E4
      { f: 440.00, d: 2.0, t: 7.5, v: 0.12 }, // A4
      { f: 493.88, d: 2.5, t: 7.8, v: 0.13 }, // B4

      // Bbmaj7 melody resolve
      { f: 116.54, d: 2.5, t: 8.8, v: 0.14 }, // Bb2
      { f: 349.23, d: 1.8, t: 9.1, v: 0.10 }, // F4
      { f: 440.00, d: 1.8, t: 9.4, v: 0.11 }, // A4
      { f: 466.16, d: 2.0, t: 9.7, v: 0.12 }, // Bb4
      { f: 587.33, d: 2.8, t: 10.0, v: 0.14 }, // D5

      // Gentle chime resolve C
      { f: 261.63, d: 3.2, t: 11.2, v: 0.13 }, // C4
      { f: 523.25, d: 3.5, t: 11.6, v: 0.12 }, // C5
      { f: 659.25, d: 3.8, t: 12.0, v: 0.14 }, // E5
    ];

    sequence.forEach((note) => {
      this.playNote(note.f, note.d, note.t, note.v);
    });

    const loopDurationMs = 13500;
    this.timerId = window.setTimeout(() => {
      if (this.isPlaying) {
        this.startMelodyLoop();
      }
    }, loopDurationMs);
  }
}

export const romanticAudio = new RomanticAudioEngine();
