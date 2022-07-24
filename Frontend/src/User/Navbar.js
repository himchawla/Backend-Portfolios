import React, {useEffect} from "react";
import axios from "axios";
import {cookies, serverPath} from "../App";

export function Logout() {

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

export function Navbar(props) {

    console.log(("NavBar" + props.active));
    
    useEffect(() => {
        document.getElementById("NavBar" + props.active) !== null ? document.getElementById("NavBar" + props.active)?.classList.add("active") :
            console.log("no active");
    }, [props.active]);

    


    return (
        <div>
            <nav className="navbar navbar-dark navbar-expand-lg fixed-top bg-white portfolio-navbar gradient">
                <div className="container">
                    <a className="navbar-brand logo" href="#">PM</a>
                    <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navbarNav">
                        <span className="visually-hidden">Toggle navigation</span>
                        <span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">

                                {
                                    props.showcase ?
                                        <a className="nav-link" id={"NavBarHome"} href={"/preview/" + props.username}>Home</a>
                                        :
                                        <a className="nav-link" id={"NavBarHome"} href={"/" + props.username}>Home</a>
                                }
                            </li>
                            <li className="nav-item">
                                {
                                    props.showcase ?
                                        <a className="nav-link" id={"NavBarProjects"}
                                           href={"/preview/" + props.username + "/projects"}>Projects</a>   
                                        :
                                        <a className="nav-link" id={"NavBarProjects"}
                                    href={"/" + props.username + "/projects"}>Projects</a>
                                }
                            </li>
                            {/*<li className="nav-item">*/}
                            {/*    <a className="nav-link" id={"NavBarCV"} href={"/" + props.username + "/cv" }>*/}
                            {/*        CV</a></li>*/}
                            {/*<li className="nav-item"><a className="nav-link" id={"NavBarContact"}*/}
                            {/*                            href={"/" + props.username + "/contact"}>Contact</a></li>*/}
                            {
                                props.showcase ?
                                    <div></div>
                                    :
                                    <li className="nav-item">
                                        <a href={"/"} className="nav-link" id={"NavBarLogout"}
                                           onClick={Logout}>Logout</a>
                                    </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>

            {
                
            }
        </div>

    )
    
}

export function Footer(props) {
    return (
        <div className="footer">
            <div className="container">

                <footer className="page-footer">
                    <div className="container">
                        <div className="links">
                            <a href={"/" + props.username}>About me</a>
                            {/*<a href={"/" + props.username + "/contact"}>Contact me</a>*/}
                            <a href={"/" + props.username + "/projects"}>Projects</a></div>
                        <div className="social-icons">
                            <a href={"/" + props.username + "/github"}><i className="icon ion-social-github"></i></a>
                            <a href={"/" + props.username + "/linkedin"}>
                                <i className="icon ion-social-linkedin"></i></a>
                            {/*<a href={"/" + props.username + "/"}><i className="icon ion-social-instagram-outline"></i></a>*/}
                            {/*<a href={"/" + props.username + "/"}><i className="icon ion-social-twitter"></i></a>*/}
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

