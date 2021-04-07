import React, { useState } from 'react';
import * as auth from 'auth-provider';
import { User } from 'screens/project-list/search-panel';

const AuthContext = React.createContext(undefined);
AuthContext.displayName = 'AuthContext';
interface AuthForm {
    username: string,
    password: string,
}

export const AuthProvider = () => {
    const [user, setUser] = useState<User | null>(null);
    const login = (form: AuthForm ) => auth.login(form).then(user => setUser(user))
}