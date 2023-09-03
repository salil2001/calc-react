import { useReducer } from "react";

//Calculator actions
const actions = {
  ADD_DIGIT: "ADD_DIGIT",
  CLEAR: "CLEAR",
  DELETE_DIGIT: "DELETE_DIGIT",
  EVALUATE: "EVALUATE",
  CHOOSE_OPERATOR: "CHOOSE_OPERATOR",
};
//Reducer logic for changing state for different actions
const reducer = (state, { type, payload }) => {
  switch (type) {
    case actions.ADD_DIGIT:
      if (payload.value === "." && state.secondNumber?.includes(".")) {
        return state;
      }

      if (state.secondNumber === "0" && payload.value === 0) {
        return state;
      }
      return {
        ...state,
        secondNumber: `${state.secondNumber || ""}${payload.value}`,
      };
    case actions.CLEAR:
      return {
        firstNumber: null,
        secondNumber: null,
        operation: null,
      };
    case actions.DELETE_DIGIT:
      if (state.secondNumber == null) {
        return {
          ...state,
          operation: null,
          secondNumber: state.firstNumber,
          firstNumber: null,
        };
      }
      return {
        ...state,
        secondNumber: state.secondNumber.toString().slice(0, -1),
      };
    case actions.CHOOSE_OPERATOR:
      if (state.firstNumber == null && state.secondNumber == null) {
        return state;
      }
      if (state.firstNumber == null) {
        return {
          ...state,
          operation: payload.value,
          firstNumber: state.secondNumber,
          secondNumber: null,
        };
      }
      if (state.secondNumber == null) {
        return state;
      }
      return {
        ...state,
        firstNumber: evaluate(state),
        operation: payload.value,
        secondNumber: null,
      };
    case actions.EVALUATE:
      return {
        firstNumber: null,
        secondNumber: evaluate(state),
        operation: null,
      };

    default:
      return state;
  }
};

//Evaluate function for different operations
function evaluate({ firstNumber, secondNumber, operation }) {
  let result = "";
  if (firstNumber == null || secondNumber == null) return;
  switch (operation) {
    case "+":
      result = (+firstNumber + +secondNumber).toString();
      return result;
    case "-":
      result = (+firstNumber - +secondNumber).toString();
      return result;
    case "x":
      result = (+firstNumber * +secondNumber).toString();
      return result;
    case "÷":
      result = (+firstNumber / +secondNumber).toString();
      return result;
    case "^":
      result = Math.pow(+firstNumber, +secondNumber).toString();
      return result;
    case "%":
      result = ((+firstNumber / 100) * +secondNumber).toString();
      return result;
    default:
      return null;
  }
}

function App() {
  const [{ firstNumber, secondNumber, operation }, dispatch] = useReducer(
    reducer,
    { firstNumber: null, secondNumber: null, operation: null }
  );

  const appendDigit = (value) => {
    dispatch({ type: actions.ADD_DIGIT, payload: { value: value } });
  };

  const allClear = () => {
    dispatch({ type: actions.CLEAR });
  };

  const deleteDigit = () => {
    dispatch({ type: actions.DELETE_DIGIT });
  };

  const chooseOperator = (value) => {
    dispatch({ type: actions.CHOOSE_OPERATOR, payload: { value: value } });
  };

  const calculate = () => {
    dispatch({ type: actions.EVALUATE });
  };

  return (
    <div className="calculator">
      <div className="display">
        {firstNumber}
        {operation}
        {secondNumber}
      </div>
      <button onClick={() => allClear()}>AC</button>
      <button onClick={() => deleteDigit()}>DEL</button>
      <button onClick={() => chooseOperator("%")}>%</button>
      <button className="highlight" onClick={() => chooseOperator("÷")}>
        ÷
      </button>
      <button onClick={() => appendDigit(7)}>7</button>
      <button onClick={() => appendDigit(8)}>8</button>
      <button onClick={() => appendDigit(9)}>9</button>
      <button className="highlight" onClick={() => chooseOperator("x")}>
        x
      </button>
      <button onClick={() => appendDigit(4)}>4</button>
      <button onClick={() => appendDigit(5)}>5</button>
      <button onClick={() => appendDigit(6)}>6</button>
      <button className="highlight" onClick={() => chooseOperator("-")}>
        -
      </button>
      <button onClick={() => appendDigit(1)}>1</button>
      <button onClick={() => appendDigit(2)}>2</button>
      <button onClick={() => appendDigit(3)}>3</button>
      <button className="highlight" onClick={() => chooseOperator("+")}>
        +
      </button>
      <button onClick={() => appendDigit(".")}>.</button>
      <button onClick={() => appendDigit(0)}>0</button>
      <button onClick={() => chooseOperator("^")}>^</button>
      <button className="equals" onClick={() => calculate()}>
        =
      </button>
    </div>
  );
}

export default App;
