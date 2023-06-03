import { ReactNode, createContext, useEffect, useReducer } from "react";

interface State {
  data: any[];
  person: object;
  show: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {
  data: [],
  person: {},
  show: false,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "GET":
      return { ...state, data: action.payload };
    case "EDIT":
      return { ...state, person: action.payload };
    case "SHOW-EDIT":
      return { ...state, show: action.payload };
    default:
      return state;
  }
}

interface PersonProviderProps {
  children: ReactNode;
}

const PersonContext = createContext<any>(null);

function PersonProvider({ children }: PersonProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/people")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "GET", payload: data }))
      .catch((error) => console.log(error));
  }, []);

  return (
    <PersonContext.Provider value={{ state, dispatch }}>
      {children}
    </PersonContext.Provider>
  );
}

export { PersonContext, PersonProvider };
