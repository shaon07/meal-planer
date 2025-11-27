import Pokemon from "./components/Pokemon";
import {
  decrement,
  increment,
} from "./context/redux/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "./hooks/rtk";

export default function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>

      <Pokemon />
    </div>
  );
}
