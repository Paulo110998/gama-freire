import { useState } from "react";
import emailjs from "emailjs-com";
import React from "react";
import Logo from "../img/logo-branca-flat.png"

const initialState = {
  name: "",
  email: "",
  message: "",
};
export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const clearState = () => setState({ ...initialState });


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, message);

    {/* replace below with your own Service ID, Template ID and Public Key from your EmailJS account */ }

    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", e.target, "YOUR_PUBLIC_KEY")
      .then(
        (result) => {
          console.log(result.text);
          clearState();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div>
      <br />
      <div id="contact">
        <div className="container">
          <div className="contact-item">
            <div className="col-md-8">
              <img class="logo-footer" src={Logo} width={520} />
            </div>
          </div>

          <div className="col-md-4 contact-info">
            <div className="contact-item">
              <h3>Contato</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Endereço
                </span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Telefone
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a href="https://www.instagram.com/gamaefreire" target="blank">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/gamaefreire/" target="blank">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/gama-e-freire-advocacia/posts/?feedView=all">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>

                  <li>
                    <a href="https://api.whatsapp.com/send?phone=5582991023387">
                      <i className="fa fa-whatsapp"></i>
                    </a>
                  </li>
                  {/* <li>
                    <a href={props.data ? props.data.youtube : "/"}>
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>
            &copy; 2024 Copy by Gama & Freire Advocacia{" "}

          </p>
        </div>
      </div>
    </div>
  );
};
