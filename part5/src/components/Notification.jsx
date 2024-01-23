const Notification = ({ statusMessage }) => {
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
  if (statusMessage.status === 'hide') {
    return null
  }

  return (
    <div style={statusMessage.status === 'success' ? success : error}>
      {statusMessage.message}
    </div>
  )
}

export default Notification