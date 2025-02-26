import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import colorSharp from "../assets/img/color-sharp.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Experience = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const experiences = [
    {
      company: "SpeedyByte",
      role: "Software Development Engineer",
      duration: "2023 - Present",
      description: "Led development of scalable web applications, implemented CI/CD pipelines, and optimized system performance."
    },
    {
      company: "Sonalika",
      role: "R&D Intern",
      duration: "2022 - 2023",
      description: "Conducted research on autonomous systems, developed ML models, and contributed to innovative agricultural solutions."
    },
    {
      company: "Iron Willed",
      role: "Software Development Engineer",
      duration: "2021 - 2022",
      description: "Built robust backend systems, managed database architectures, and implemented security protocols."
    }
  ];

  return (
    <section className="experience" id="experience">
      <Container>
        <Row>
          <Col>
            <TrackVisibility key="experience-section">
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <div className="experience-bx">
                    <h2>Professional Experience</h2>
                    <p>Journey through my professional experiences and the impact I've made in different roles.</p>
                    <Carousel 
                      responsive={responsive} 
                      infinite={true} 
                      className="experience-slider"
                      aria-label="Experience Timeline">
                      {experiences.map((exp, index) => (
                        <div 
                          key={index} 
                          className="experience-item"
                          role="article"
                          aria-label={`Experience at ${exp.company}`}>
                          <h3>{exp.company}</h3>
                          <h4>{exp.role}</h4>
                          <h5>{exp.duration}</h5>
                          <p>{exp.description}</p>
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-left" src={colorSharp} alt="Background" />
    </section>
  )
} 