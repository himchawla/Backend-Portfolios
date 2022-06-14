import React from "react";
import {Link} from "react-router-dom";
import {MainNavbar} from "./User/MainNavbar";
import {cookies, serverPath} from "./App";
import axios from "axios";

export function Home() {
    if(cookies.get("sessionToken") !== undefined) {
        axios.post(serverPath + "/user/logout", {token: cookies.get("sessionToken")}).then(res => {
            console.log(res.data);
            if (res.data === "success") {
                console.log("logout success");
                window.location.href = "/";
            }
        }).catch(err => {
            console.log(err);
        })
        cookies.remove("sessionToken");
        cookies.remove("username");
    }
return (
    <div>
        <MainNavbar active={'Home'}/>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <br />
                    <br />
                    <br />
                    <h1>Welcome to the Portfolio Maker</h1>
                    <p>
                        Sign Up or Login to get started
                    </p>
                </div>
            </div>
        </div>
    </div>
)
}