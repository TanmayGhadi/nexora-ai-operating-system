import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseCounterOptions {
  start?: number;
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  scrollTrigger?: boolean;
}

export function useCounter(options: UseCounterOptions) {
  const {
    start = 0,
    end,
    duration = 2,
    prefix = '',
    suffix = '',
    decimals = 0,
    scrollTrigger: useScrollTrigger = true,
  } = options;

  const [value, setValue] = useState(start);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!useScrollTrigger) {
      const proxy = { val: start };
      gsap.to(proxy, {
        val: end,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          setValue(Number(proxy.val.toFixed(decimals)));
        },
      });
      return;
    }

    const el = ref.current;
    if (!el) return;

    const proxy = { val: start };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        gsap.to(proxy, {
          val: end,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            setValue(Number(proxy.val.toFixed(decimals)));
          },
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [end, duration, decimals, useScrollTrigger]);

  const formattedValue = `${prefix}${value.toLocaleString()}${suffix}`;

  return { ref, value, formattedValue };
}
