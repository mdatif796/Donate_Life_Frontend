export const variants = {
  visible: {
    x: 0,
    opacity: 1,
    transition: { ease: "easeInOut", duration: 0.5 },
  },
  hidden: { x: "100vw", opacity: 0 },
  exit: {
    x: "-100vw",
    opacity: 0,
    transition: { ease: "easeInOut", duration: 0.5 },
  },
};
