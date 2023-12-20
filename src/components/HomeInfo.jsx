/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { arrow } from "../assets/icons"

const InfoBox = ({ text, link, btnText }) => (
  <div className="info-box">
    <p className="font-medium sm:text-xl text-center">{text}</p>
    <Link to={link} className="neo-brutalism-white neo-btn">
      {btnText}
      <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
    </Link>
  </div>
)

const renderContent = {
  1: (
    <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
      大家好，我是<span className="font-semibold">周文峰</span> 👋
      <br />
      一个在校大学生，目前就读于
      <span className="font-semibold">重庆移通学院</span>，专业是
      <span className="font-semibold">计算机科学与技术</span>。
    </h1>
  ),
  2: (
    <InfoBox
      text="我喜欢编程，喜欢探索新事物，喜欢学习新知识。"
      link="/about"
      btnText="了解更多"
    />
  ),
  3: (
    <InfoBox
      text="在校期间自己做过一些小项目。"
      link="/projects"
      btnText="了解更多"
    />
  ),
  4: (
    <InfoBox
      text="如果需要，可以联系我。"
      link="/contact"
      btnText="联系我"
    />
  )
}

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null
}

export default HomeInfo
