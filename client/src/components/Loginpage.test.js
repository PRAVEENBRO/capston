import Loginpage from "./Loginpage"
import { fireEvent, render } from "@testing-library/react";
import {BrowserRouter as Router, Route } from 'react-router-dom'

describe ("Login Button", ()=> {
    it("Login button render", ()=> {
        let {queryByTitle} = render(<Router><Route exact path='/' component={Loginpage} /></Router>)
        let btn = queryByTitle("loginBtn")
        expect(btn).toBeTruthy()
    })
    it("onClick",()=> {
        let {queryByTitle} = render(<Router><Route exact path='/' component={Loginpage} /></Router>)
        // eslint-disable-next-line testing-library/prefer-screen-queries
        let btn =queryByTitle("loginBtn")
        fireEvent.click(btn)
    })
})

describe("input field test",()=>{
    it("login render",()=>{
        let {queryByTitle}=render (<Router><Route exact path='/' component={Loginpage} /></Router>)
        let input = queryByTitle("email")
        expect(input).toBeTruthy()
    })
   
})