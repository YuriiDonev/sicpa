import React, { Component } from 'react';
import moment from "moment";

class Footer extends Component {
    render(){
        return (
            <footer className={"footer" + (this.props.transparent !== undefined ? " footer-transparent":"")}>
                <div className={"container" + (this.props.fluid !== undefined ? "-fluid":"")}>
                    <nav className="pull-left">
                        <ul>
                            <li>
                                <a href="#pablo">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#pablo">
                                    Company
                                </a>
                            </li>
                            <li>
                                <a href="#pablo">
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="#pablo">
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <p className="copyright pull-right">
                      &copy; {1900 + (moment().toDate()).getYear()} <a href="http://www.creative-tim.com">Creative Tim</a>, made with <i className="fa fa-heart heart"></i> for a better web
                    </p>
                </div>
            </footer>
        );
    }
}
export default Footer;
