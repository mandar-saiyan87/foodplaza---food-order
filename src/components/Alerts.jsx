import React from 'react'

const Alerts = ({ message, status }) => {

  let borderColor = ''
  let bgColor = ''

  switch (status) {
    case 'Success':
      borderColor = '#52BE80 '
      bgColor = '#D4EFDF'
      break;
    case 'Warning':
      borderColor = '#D4AC0D'
      bgColor = '#F9E79F'
      break;
    case 'Error':
      borderColor = '#CD6155'
      bgColor = '#F2D7D5'
      break;
    default:
      break;
  }

  return (
    <div className='alert_div'>
      <div className='alert_message'
        style={{ color: `${borderColor}`, border: `1px solid ${borderColor}`, backgroundColor: `${bgColor}` }}>
        <p>{message}</p>
      </div>
    </div>

  )
}

export default Alerts
