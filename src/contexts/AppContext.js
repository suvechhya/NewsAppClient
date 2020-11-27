import React, { useState } from 'react';

const AppContext = React.createContext();

function AppProvider ({children}) {
    const [showLoader, setShowLoader] = useState(false);
    /* For the timebeing, context is holding only the state of the loader,
    eventually this context will hold all the login information as well*/
    const contextValues = [showLoader, setShowLoader];
    return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
}

export { AppContext, AppProvider };