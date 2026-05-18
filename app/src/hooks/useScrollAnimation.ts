import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  opacity?: number;
  scale?: number;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 30,
      x = 0,
      duration = 0.8,
      delay = 0,
      stagger = 0,
      ease = 'power2.out',
      start = 'top 85%',
      opacity = 0,
      scale,
    } = options;

    const targets = stagger > 0 ? el.children : el;

    gsap.set(el, { visibility: 'visible' });

    const fromVars: gsap.TweenVars = {
      y,
      x,
      opacity,
      duration,
      delay,
      ease,
      stagger: stagger > 0 ? stagger : undefined,
    };

    if (scale !== undefined) {
      fromVars.scale = scale;
    }

    const anim = gsap.from(targets, {
      ...fromVars,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  return ref;
}

export function useBatchScrollAnimation(
  selector: string,
  options: ScrollAnimationOptions = {}
) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;

    const {
      y = 30,
      duration = 0.6,
      stagger = 0.08,
      ease = 'power2.out',
      start = 'top 90%',
      opacity = 0,
    } = options;

    const anim = gsap.from(elements, {
      y,
      opacity,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: elements[0].parentElement,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      anim.kill();
    };
  }, [selector]);
}
