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
                            <a className="text-muted" target="_blank" rel="noopener noreferrer" href="https://github.com/JoshLore/TheCodingNetwork-API">API</a>
                        </li>
                        <li className="mb-2">
                            <a className="text-muted" target="_blank" rel="noopener noreferrer" href="https://github.com/JoshLore/TheCodingNetwork-Frontend">Frontend</a>
                        </li>
                    </ul>
                </div>

                <div className="col-6 col-md mt-3">
                    <h5>Built with</h5>
                    <ul className="list-unstyled text-small">
                        <li className="mb-2">
                            <a className="text-muted mb-5" target="_blank" rel="noopener noreferrer" href="https://nodejs.org/">Node.js</a>
                        </li>
                        <li className="mb-2">
                            <a className="text-muted" target="_blank" rel="noopener noreferrer" href="https://reactjs.org/">React.js</a>
                        </li>
                        <li className="mb-2">
                            <a className="text-muted" target="_blank" rel="noopener noreferrer" href="https://www.mongodb.com/">MongoDB</a>
                        </li>
                        <li className="mb-2">
                            <a className="text-muted" target="_blank" rel="noopener noreferrer" href="https://www.digitalocean.com/">DigitalOcean</a>
                        </li>
                        <li className="mb-2">
                            <a className="text-muted" target="_blank" rel="noopener noreferrer" href="https://fezvrasta.github.io/bootstrap-material-design/">Bootstrap Material</a>
                        </li>
                    </ul>
                </div>

                <div className="col-6 col-md mt-3">
                    <h5>Contact</h5>
                    <ul className="list-unstyled text-small">
                        <li className="mb-2">
                            <a className="text-muted mb-5" target="_blank" rel="noopener noreferrer" href="https://loredevelops.com">Portfolio</a>
                        </li>
                        <li className="mb-2">
                            <a className="text-muted" target="_blank" rel="noopener noreferrer" href="https://github.com/JoshLore">Github</a>
                        </li>
                        <li className="mb-2">
                            <a className="text-muted" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/joshua-kelley-1950b315b/">LinkedIn</a>
                        </li>
                        <li className="mb-2">
                            <a className="text-muted" target="_blank" rel="noopener noreferrer" href="mailto:loredevelops@gmail.com">Email</a>
                        </li>
                        <li className="mb-2">
                            <p className="text-muted" style={{ cursor: "pointer" }} onClick={showNumber}>{show ? `(915) 256-1185` : `Phone Number`}</p>
                        </li>
                    </ul>
                </div>

            </div>

        </div>
    )
}

export default Footer;