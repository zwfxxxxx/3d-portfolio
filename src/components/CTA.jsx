import { Link } from "react-router-dom"

const CTA = () => {
  return (
    <section className="cta">
      <p className="cta-text">
        心动不如行动，
        <br className="sm:block hidden" />
        一起来做点什么吧
      </p>
      <Link to="/contact" className="btn">
        联系我
      </Link>
    </section>
  )
}

export default CTA
