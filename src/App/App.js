import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Search from "../Recipes/Search";
import ShoppingList from "../ShoppingList/ShoppingList";
import 'bootstrap/dist/css/bootstrap.min.css';
import NewRecipeAndIngredient from "../Components/NewRecipeAndIngredient";
import Navbar from "../Nav/Navbar";

function App() {
    return (
        <div>
            <Router>
                <div>
                    <Navbar/>
                    <Switch>
                        <Route path="/uusiresepti">
                            <NewRecipeAndIngredient/>
                        </Route>
                        <Route path="/kauppalista">
                            <ShoppingList/>
                        </Route>
                        <Route path="/">
                            <Search/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}


export default App;
