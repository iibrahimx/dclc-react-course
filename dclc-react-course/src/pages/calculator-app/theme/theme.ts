export type Theme = "theme1" | "theme2" | "theme3";

export const themes = {
  theme1: {
    mainBg: "hsl(222, 26%, 31%)",
    keypadBg: "hsl(223, 31%, 20%)",
    screenBg: "hsl(224, 36%, 15%)",
    text: "white",
  },
  theme2: {
    mainBg: "hsl(0, 0%, 90%)",
    keypadBg: "hsl(0, 5%, 81%)",
    screenBg: "hsl(0, 0%, 93%)",
    text: "hsl(60, 10%, 19%)",
  },
  theme3: {
    mainBg: "hsl(268, 75%, 9%)",
    keypadBg: "hsl(268, 71%, 12%)",
    screenBg: "hsl(268, 71%, 12%)",
    text: "white",
  },
};
