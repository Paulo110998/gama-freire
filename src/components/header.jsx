import React, { useState } from "react";
import Modal from "react-modal";
import emailjs from 'emailjs-com'; // Importe o emailjs

const customStyles = {
  content: {
    top: '56%',
    color: 'black',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90%',
    width: '700px',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

// Defina seu elemento de aplicativo para acessibilidade
Modal.setAppElement('#root');

export const Header = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [userWhatsapp, setUserWhatsapp] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [brandName, setBrandName] = useState(""); // Campo para o nome da marca

  // Endereço de e-mail do destinatário
  const recipientEmail = "evertonpaulo1998@gmail.com"; // E-mail do destinatário

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setLoading(false);
    setFormVisible(false);
    setBrandName(""); // Reseta o nome da marca ao fechar
  }

  function handleConclude() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormVisible(true);
    }, 2000);
  }

  function handleFinalize() {
    const templateParams = {
      from_name: userName,
      from_whatsapp: userWhatsapp,
      from_email: userEmail,
      brand_name: brandName,
      to_email: recipientEmail, // Adiciona o e-mail do destinatário
    };

    // Envie o e-mail usando EmailJS
    emailjs.send("service_fvz8l9a", "template_j7xa3bd", templateParams, "0L_5jkriR9mFy9k1k")
      .then((response) => {
        console.log('Email enviado com sucesso!', response.status, response.text);
        alert('Email enviado com sucesso!');
      })
      .catch((err) => {
        console.error('Erro ao enviar o email:', err);
        alert('Falha ao enviar o email. Tente novamente.');
      });

    // Redireciona após o envio
    window.location.href = "https://astrumpay.com.br/";
  }

  return (
    <header id="header" style={{ marginTop: "-100px" }}>
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>{props.data ? props.data.title : "Loading"}</h1>
                <p className="intro-p"><b>{props.data ? props.data.paragraph : "Loading"}</b></p>
                <button onClick={openModal} className="btn btn-custom btn-lg">
                  Quero Consultar
                </button>

                {/* Modal */}
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Consulta de Viabilidade"
                >
                  <h2>Consulta de viabilidade da marca</h2>
                  <button onClick={closeModal} className="close" style={{ cursor: 'pointer', float: 'right' }}>&times;</button>
                  <div>
                    {!formVisible ? (
                      loading ? (
                        <p>Carregando...</p>
                      ) : (
                        <>
                          <label>Digite o nome da marca que deseja consultar:</label>
                          <input
                            type="text"
                            className="form-control"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                          />
                          <br />
                          <button
                            onClick={handleConclude}
                            className="btn mt-2"
                            style={{ backgroundColor: 'black', color: 'white' }}
                          >
                            Buscar
                          </button>
                        </>
                      )
                    ) : (
                      <>
                        <p>
                          <strong>Parabéns!</strong><br />
                          Parece que <strong>{brandName}</strong> está disponível para registro.
                        </p>
                        <p>
                          QUER SABER MAIS? <br />
                          Deixe seus dados abaixo e entraremos em contato com mais informações.
                        </p>
                        <form>
                          <div className="form-group">
                            <label>Qual o seu nome?</label>
                            <input
                              type="text"
                              className="form-control"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label>Qual o seu Whatsapp?</label>
                            <input
                              type="text"
                              className="form-control"
                              value={userWhatsapp}
                              onChange={(e) => setUserWhatsapp(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label>Qual o seu email?</label>
                            <input
                              type="email"
                              className="form-control"
                              value={userEmail}
                              onChange={(e) => setUserEmail(e.target.value)}
                            />
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              style={{ marginLeft: '5px' }}
                              checked={acceptedTerms}
                              onChange={() => setAcceptedTerms(!acceptedTerms)}
                            />
                            <label className="form-check-label">Aceito os termos de uso</label>
                          </div>
                        </form>
                        <button
                          onClick={handleFinalize}
                          className="btn btn-success mt-3"
                          disabled={!acceptedTerms}
                        >
                          Finalizar
                        </button>
                      </>
                    )}
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
