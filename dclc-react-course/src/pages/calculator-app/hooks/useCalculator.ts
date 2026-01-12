import { useState } from "react";

type Operator = "+" | "-" | "x" | "/";

export function useCalculator() {
  const [current, setCurrent] = useState("0");
  const [previous, setPrevious] = useState<string | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [overwrite, setOverwrite] = useState(true);

  function inputDigit(digit: string) {
    if (overwrite) {
      setCurrent(digit);
      setOverwrite(false);
      return;
    }

    if (digit === "0" && current === "0") return;
    setCurrent(current + digit);
  }

  function chooseOperator(op: Operator) {
    if (operator && previous !== null) {
      const result = calculate(previous, current, operator);
      setPrevious(result);
      setCurrent(result);
    } else {
      setPrevious(current);
    }

    setOperator(op);
    setOverwrite(true);
  }

  function evaluate() {
    if (!operator || previous === null) return;

    const result = calculate(previous, current, operator);
    setCurrent(result);
    setPrevious(null);
    setOperator(null);
    setOverwrite(true);
  }

  function deleteDigit() {
    if (overwrite) return;

    if (current.length === 1) {
      setCurrent("0");
      setOverwrite(true);
    } else {
      setCurrent(current.slice(0, -1));
    }
  }

  function reset() {
    setCurrent("0");
    setPrevious(null);
    setOperator(null);
    setOverwrite(true);
  }

  return {
    current,
    inputDigit,
    chooseOperator,
    evaluate,
    deleteDigit,
    reset,
  };
}

function calculate(a: string, b: string, op: Operator): string {
  const x = parseFloat(a);
  const y = parseFloat(b);

  switch (op) {
    case "+":
      return String(x + y);
    case "-":
      return String(x - y);
    case "x":
      return String(x * y);
    case "/":
      return y === 0 ? "0" : String(x / y);
  }
}
