import React, { useState } from 'react';

// Footer
const Footer = () => {
    const [show, setShow] = useState(false);

    const showNumber = () => {
        setShow(!show);
    }

    return (
        <div className="container py-3">
            <hr />
            <div className="row">
                <div className="col-6 col-md mt-3">
                    <h5>Github Repo</h5>
                    <ul className="list-unstyled text-small">
                        <li className="mb-2">
                            <a className="text-muted" target="_blank" rel="noopener noreferrer" href="https://github.com/JoshLore/TheCodingNetwork-API"><i className="fas fa-code-branch"></i> API</a>
                        </li>
                        <li className="mb-2">
                            <a className="text-muted" target="_blank" rel="noopener noreferrer" href="https://github.com/JoshLore/TheCodingNetwork-Frontend"><i className="fas fa-object-group"></i> Frontend</a>
                        </li>
                    </ul>
                </div>

                <div className="col-6 col-md mt-3">
                    <h5>Built with</h5>
                    <ul className="list-unstyled text-small">
                        <li className="mb-2">
                            <a className="text-muted mb-5" target="_blank" rel="noopener noreferrer" href="https://nodejs.org/"><i className="fab fa-node-js"></i> Node.js</a>
                        </li>
                        <li className="mb-2">
                            <a className="text-muted" target="_blank" rel="noopener noreferrer" href="https://reactjs.org/"><i className="fab fa-react"></i> React.js</a>
                        </li>
                        <li className="mb-2">
                            <a className="text-muted" target="_blank" rel="noopener noreferrer" href="https://www.mongodb.com/"><i className="fas fa-server"></i> MongoDB</a>
                        </li>
                        <li className="mb-2">
                            <a className="text-muted" target="_blank" rel="noopener noreferrer" href="https://www.digitalocean.com/"><i className="fab fa-digital-ocean"></i> DigitalOcean</a>
                        </li>
                        <li className="mb-2">
                            <a className="text-muted" target="_blank" rel="noopener noreferrer" href="https://fezvrasta.github.io/bootstrap-material-design/"><i className="fab fa-bootstrap"></i> Bootstrap Material</a>
                        </li>
                    </ul>
                </div>

                <div className="col-6 col-md mt-3">
                    <h5>Contact</h5>
                    <ul className="list-unstyled text-small">
                        <li className="mb-2">
                            <a className="text-muted mb-5" target="_blank" rel="noopener noreferrer" href="http://loredevelops.com"><i className="fas fa-user-circle"></i> Portfolio</a>
                        </li>
                        <li className="mb-2">
                            <a className="text-muted" target="_blank" rel="noopener noreferrer" href="https://github.com/JoshLore"><i className="fab fa-github"></i> Github</a>
                        </li>
                        <li className="mb-2">
                            <a className="text-muted" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/joshua-kelley-1950b315b/"><i className="fab fa-linkedin"></i> LinkedIn</a>
                        </li>
                        <li className="mb-2">
                            <a className="text-muted" target="_blank" rel="noopener noreferrer" href="mailto:loredevelops@gmail.com"><i className="fas fa-envelope"></i> Email</a>
                        </li>
                        <li className="mb-2">
                            <p className="text-muted" style={{ cursor: "pointer" }} onClick={showNumber}><i className="fas fa-phone"></i> {show ? `(915) 256-1185` : `Phone Number`}</p>
                        </li>
                    </ul>
                </div>

            </div>

        </div>
    )
}

export default Footer;