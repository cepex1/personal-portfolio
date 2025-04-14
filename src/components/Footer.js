import { Container, Row, Col } from "react-bootstrap";

export const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row className="align-item-center">
                <Col sm={6}>
                    {/* <img src={logo} alt="Logo" /> */}
                    </Col>
                    <Col sm={6} className="text-center text-sm-end">
                    </Col>
                        <p>CopyRight 2025. All Rights Reserved. Javier Buendía</p>
                </Row>
            </Container>
            </footer>
    )
}