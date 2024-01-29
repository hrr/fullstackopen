import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  
  const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  const success = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: '16',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (notification.status === 'hide') {
    return null
  }

  return (
    <div style={notification.status === 'success' ? success : error}>
      {notification.message}
    </div>
  )
}

export default Notification