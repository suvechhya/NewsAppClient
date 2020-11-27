import React, { useState } from 'react';

const AppContext = React.createContext();

function AppProvider ({children}) {
    const [showLoader, setShowLoader] = useState(false);
    const contextValues = [showLoader, setShowLoader];
    return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
}

export { AppContext, AppProvider };