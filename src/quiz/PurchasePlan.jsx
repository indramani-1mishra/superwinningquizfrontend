import React, { useEffect, useState } from 'react'
import basicImg from '../assets/basic.png'
import Subscription from './Subscription'
import Header from '../component/Header' // ✅ header import

function PurchasePlan() {
  const [showPopup, setShowPopup] = useState(false)

  const selectPlan = (planId) => {
    console.log(`Plan selected: ${planId}`)
    setShowPopup(true) // ✅ Popup khul jaayega
  }

  const handleProceed = (option) => {
    console.log(`Proceed with: ${option}`)
    setShowPopup(false) // ✅ Proceed ke baad popup band
  }

  const handleClose = () => {
    setShowPopup(false) // ✅ Cancel pe popup band
  }

  useEffect(() => {
    document.body.classList.add('plan-banner', 'overflow-y-hidden') // ✅ body scroll lock
    return () => {
      document.body.classList.remove('plan-banner', 'overflow-y-hidden')
    }
  }, [])

  return (
    <div className="plan-banner min-h-screen flex flex-col overflow-y-hidden">
      {/* ✅ Header sabse upar */}
      <Header />

      <div className="sec-2 flex-grow flex flex-col justify-start items-center pb-4 md:block md:justify-start md:items-start ">
        <div className="container">
          <div className="row Products-option flex justify-content-center items-center">
            {/* --- Daily Plan --- */}
            <div className="col-md-4 basic items-center border p-4 rounded-lg shadow text-center">
              {/* ✅ Image center aligned, no hover effect */}
              <div className="flex justify-center mb-4">
                <img
                  src={basicImg}
                  alt="Basic Plan"
                  className="w-32 h-auto object-contain pointer-events-none"
                />
              </div>
              <h3>Daily Plan</h3>
              <h1>1 SZL / Daily</h1>
              <h3>Features Included:</h3>
            <ul className="list-disc text-left px-4 md:px-6 lg:px-8">
  <li>
    Get a chance to win Bumper prize of 100k SZL and smartphones by
    participating in Weekly Quiz
  </li>
</ul>

              <div
                className="btn bg-blue-600 text-black px-4 py-2 rounded cursor-pointer mt-4"
                onClick={() => selectPlan(1)}
              >
                CLICK <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Show popup only if true */}
      {showPopup && (
        <Subscription onClose={handleClose} onProceed={handleProceed} />
      )}
    </div>
  )
}

export default PurchasePlan
