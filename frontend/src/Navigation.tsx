import { Redirect, Route, Switch } from "wouter";

const HomeScreen = () => <h1>Bienvenido a Quiz Clash</h1>;
const LoginScreen = () => <h1>Pantalla de Login</h1>;

export const Navigation = () => {
    const isLoggedIn = true;

    if (isLoggedIn) {
        return (
            <Switch>
                <Route path="/">
                    <HomeScreen />
                </Route>
                <Route>
                    <Redirect href="/"/>
                </Route>
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/login">
                <LoginScreen />
            </Route>
            <Route>
                <Redirect href="/login"/>
            </Route>
        </Switch>
    );
}

