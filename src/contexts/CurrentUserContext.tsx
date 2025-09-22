import { createContext, useState, type ReactNode } from "react";

export const CurrentUserContext = createContext<any>(null);
export const SetCurrentUserContext = createContext<any>(() => {});

export function CurrentUserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

// lines 3 + 4: create the (empty) context objects and export
// lines 6 + 7: create a provider component that sets up state
// line 11: shows the component can wrap other JSX (outer shares the state; inner shares the setter)
// everything is exported!
