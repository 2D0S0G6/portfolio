'use client';

import { useEffect, useRef, useState } from 'react';
import { IconButton } from './IconButton';

interface AmbientAudio {
  ctx: AudioContext;
  gain: GainNode;
}

/**
 * Generates a soft ambient hiss with the Web Audio API — a looping buffer of
 * brown noise behind a low-pass filter. Nothing is downloaded.
 *
 * The graph is built lazily on first activation because browsers only allow an
 * AudioContext to start inside a user gesture.
 */
export function SoundToggle() {
  const audioRef = useRef<AmbientAudio | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    return () => {
      void audioRef.current?.ctx.close().catch(() => {});
    };
  }, []);

  function createAudio(): AmbientAudio | null {
    const Ctor = window.AudioContext ?? window.webkitAudioContext;
    if (!Ctor) return null;

    const ctx = new Ctor();
    const length = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Integrate white noise into brown noise, then lift the amplitude back up.
    let last = 0;
    for (let i = 0; i < length; i += 1) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.2;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 380;

    const gain = ctx.createGain();
    gain.gain.value = 0;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();

    return { ctx, gain };
  }

  function toggle() {
    try {
      audioRef.current ??= createAudio();
      const audio = audioRef.current;
      if (!audio) return;

      const next = !on;
      if (audio.ctx.state === 'suspended') void audio.ctx.resume();
      audio.gain.gain.linearRampToValueAtTime(next ? 0.03 : 0, audio.ctx.currentTime + 0.6);
      setOn(next);
    } catch {
      setOn(false);
    }
  }

  return (
    <IconButton onClick={toggle} aria-label="Toggle ambient sound" aria-pressed={on} title="Ambient sound">
      <span
        aria-hidden="true"
        className={on ? 'font-mono text-[11px] tracking-[0.04em]' : 'font-mono text-[11px] opacity-50'}
      >
        {on ? '||||' : '.:.:'}
      </span>
    </IconButton>
  );
}
