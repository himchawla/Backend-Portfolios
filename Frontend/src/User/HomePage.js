import React, {Component} from "react";
import {Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {cookies, serverPath} from "../App";
import {Footer, Navbar} from "./Navbar";
import {MainPage} from "./MainPage";
import {Projects} from "./Projects";
import {CV} from "./CV";
import {Contact} from "./Contact";

const withRouter = WrappedComponent => props => {
    // const params = useParams();
    // etc... other react-router-dom v6 hooks

    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return <WrappedComponent {...props} location={location} navigate={navigate} params={params} />;
    // return (
    //     <WrappedComponent
    //         {...props}
    //         params={params}
    //         // etc...
    //     />
    // );
};



export class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: this.props.id,
            user: null,
            showcase :this.props.showcase,
        }
        
        if(this.state.showcase === undefined) {
            
            this.setState({showcase: false});
        }
        
        if(this.state.showcase === true) {

            axios.post(`${serverPath}/check`, {
                username: this.state.username
            }).then(res => {
                if (res.data === "username available") {
                    window.location.href = "/login";
                }
            }).catch(err => {
                console.log(err);
            });
            
            return;
        }
        
        const sessionToken = cookies.get("sessionToken");
        if (sessionToken === undefined) {
            console.log("no session token");
            window.location.href = "/login";
        }

        

        console.log();
        axios.post(serverPath + "/user/auth", {token: sessionToken === undefined ? "" : sessionToken}).then(res => {
            console.log(res.data);

            // const navigateToLogin = () => {
            //     useNavigate("/login");
            // }

            if (res.data.msg === "success") {
                console.log("auth returned success");
            }
            if (res.data === "error") {
                window.location.href = "/login";
                //navigateToLogin();
            }
        }).catch(err => {
            console.log(err);
        });





        console.log(this.state.user);
    }


   

    componentDidMount() {
        //this.state.username = this.props.id;


    }

    

    render(){

        var active = window.location.pathname === "/" + this.state.username ? "Home" : window.location.pathname === "/" + this.state.username + "/projects" ? "Projects" : window.location.pathname === "/" + this.state.username + "/cv" ? "CV" : window.location.pathname === "/" + this.state.username + "/contact" ? "Contact" : "";
        return  (

            <div className="HomePage">

                {console.log(window.location.pathname)}
                
                <Navbar username={this.state.username} active={active} showcase={this.state.showcase}/>


                <Routes>
                    <Route path={"/projects/*"} element={<Projects username={this.state.username} showcase={this.state.showcase}/>}/>

                    <Route path={"/"} element={<MainPage username={this.state.username} showcase={this.state.showcase}/>}/>

                    <Route path={"/contact"} element={<Contact username={this.state.username} showcase={this.state.showcase}/>}/>
                    <Route path={"/cv"} element={<CV username={this.state.username} showcase={this.state.showcase}/>}/>
                    {/*<Route path={"/logout"} element={<Logout />} />*/}
                </Routes>
                

            <Footer username={this.state.username} />
            </div>
        )


    }
}

export default withRouter(HomePage);


