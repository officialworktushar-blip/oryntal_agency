"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const STORAGE_KEY = "oryntal-intro-seen";
const SHOW_MS = 700;

export default function PageTransition() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const prevPathname = useRef(pathname);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;
    if (reduceMotion) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) !== "1") return;
    } catch {
      return;
    }
    setShow(true);
    const timer = window.setTimeout(() => setShow(false), SHOW_MS);
    return () => window.clearTimeout(timer);
  }, [pathname, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="curtain"
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[150]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2"
            style={{
              background:
                "linear-gradient(135deg, #5B34D6, #2B1A7A)",
              transformOrigin: "left center",
            }}
            animate={{ scaleX: [0, 1, 1, 0] }}
            transition={{
              duration: 0.7,
              times: [0, 0.4, 0.57, 1],
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2"
            style={{
              background:
                "linear-gradient(135deg, #5B34D6, #2B1A7A)",
              transformOrigin: "right center",
            }}
            animate={{ scaleX: [0, 1, 1, 0] }}
            transition={{
              duration: 0.7,
              times: [0, 0.4, 0.57, 1],
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 0.7,
              times: [0, 0.4, 0.57, 1],
              ease: "easeInOut",
            }}
          >
            <Image
              src="/logo.png"
              alt=""
              width={56}
              height={56}
              className="h-14 w-14 object-contain"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
