export type Theme = "theme1" | "theme2" | "theme3";

export const themes = {
  theme1: {
    mainBg: "hsl(222, 26%, 31%)",
    keypadBg: "hsl(223, 31%, 20%)",
    screenBg: "hsl(224, 36%, 15%)",
    // Keys
    keyResetBg: "hsl(225, 21%, 49%)",
    keyResetShadow: "hsl(224, 28%, 35%)",
    keyEqualBg: "hsl(6, 63%, 50%)",
    keyEqualShadow: "hsl(6, 70%, 34%)",
    keyNumBg: "hsl(30, 25%, 89%)", // Added from guide
    keyNumShadow: "hsl(28, 16%, 65%)",
    // Text
    textMain: "hsl(0, 0%, 100%)", // White
    textSecondary: "hsl(221, 14%, 31%)", // For number keys
  },
  theme2: {
    mainBg: "hsl(0, 0%, 90%)",
    keypadBg: "hsl(0, 5%, 81%)",
    screenBg: "hsl(0, 0%, 93%)",
    // Keys
    keyResetBg: "hsl(185, 42%, 37%)",
    keyResetShadow: "hsl(185, 58%, 25%)",
    keyEqualBg: "hsl(25, 98%, 40%)",
    keyEqualShadow: "hsl(25, 99%, 27%)",
    keyNumBg: "hsl(45, 7%, 89%)",
    keyNumShadow: "hsl(35, 11%, 61%)",
    // Text
    textMain: "hsl(60, 10%, 19%)", // Dark Gray
    textSecondary: "hsl(0, 0%, 100%)", // White (for Reset/Equal keys)
  },
  theme3: {
    mainBg: "hsl(268, 75%, 9%)",
    keypadBg: "hsl(268, 71%, 12%)",
    screenBg: "hsl(268, 71%, 12%)",
    // Keys
    keyResetBg: "hsl(281, 89%, 26%)",
    keyResetShadow: "hsl(285, 91%, 52%)",
    keyEqualBg: "hsl(176, 100%, 44%)",
    keyEqualShadow: "hsl(177, 92%, 70%)",
    keyNumBg: "hsl(268, 47%, 21%)",
    keyNumShadow: "hsl(290, 70%, 36%)",
    // Text
    textMain: "hsl(52, 100%, 62%)", // Yellow
    textSecondary: "hsl(0, 0%, 100%)", // White
    textAccent: "hsl(198, 20%, 13%)", // Dark blue for Equal button
  },
};
