/* eslint-disable react/no-unknown-property */
import { Suspense, useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import { Canvas } from "@react-three/fiber"
import Fox from "../models/Fox"
import Loader from "../components/Loader"
import useAlert from "../hooks/useAlert"
import Alert from "../components/Alert"

const Contact = () => {
  const formRef = useRef(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [currentAnimation, setCurrentAnimation] = useState("idle")

  const {alert, showAlert, hideAlert} = useAlert()

  const handleChange = (e) =>  {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFocus = () => setCurrentAnimation('walk')
  const handleBlur = () => setCurrentAnimation('idle')
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setCurrentAnimation('hit')

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "周文峰",
          from_email: form.email,
          to_email: "",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false)

        setTimeout(() => {
          hideAlert()
          setCurrentAnimation('idle')
        }, 3000)
        
        setForm({
          name: "",
          email: "",
          message: "",
        })
        showAlert({type: "success", text: "发送成功！"})
      })
      .catch((error) => {
        setLoading(false)
        setCurrentAnimation('idle')
        console.log(error)
        showAlert({type: "danger", text: "发送失败！"})
      })
  }

  return (
    <section className="relative flex lg:flex-row flex-col max-container h-[100vh]">
      {alert.show && <Alert {...alert}/>}
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">联系方式</h1>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-7 mt-14"
        >
          <label className="text-black-500 font-semibold">
            姓名
            <input
              type="text"
              name="name"
              className="input"
              placeholder="你的名字"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold">
            邮箱
            <input
              type="email"
              name="email"
              className="input"
              placeholder="你的邮箱"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold">
            留言
            <textarea
              type="text"
              rows={4}
              name="message"
              className="textarea"
              placeholder="我可以帮你什么？"
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            type="submit"
            className="btn"
            disabled={loading}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {loading ? "发送中..." : "发送"}
          </button>
        </form>
      </div>
      <div className="lg:w-1/2 w-full lg:h-auto md-h-[550px] h-[350px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <Fox
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
              currentAnimation={currentAnimation}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Contact
