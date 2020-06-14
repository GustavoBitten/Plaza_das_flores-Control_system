let createToast = (msg, title, type) => {
  let options = {
    text: msg, // Text that is to be shown in the toast
    heading: title, // Optional heading to be shown on the toast
    showHideTransition: 'fade', // fade, slide or plain
    allowToastClose: false, // Boolean value true or false
    hideAfter: 5000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
    stack: false, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
    position: 'top-center', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values

    bgColor: '#5289ef',  // Background color of the toast (red: '#bc2929')
    textColor: '#fff',  // Text color of the toast (white: '#ffffff')
    textAlign: 'left',  // Text alignment i.e. left, right or center
    loader: true,  // Whether to show loader or not. True by default
    loaderBg: '#1eff00',  // Background color of the toast loader
  }

  switch (type) {
    case 'primary':
      options.bgColor = '#007bff'
      break
    case 'secondary':
      options.bgColor = '#6c757d'
      break
    case 'success':
      options.bgColor = '#28a745'
      break
    case 'danger':
      options.bgColor = '#dc3545'
      break
    case 'warning':
      options.bgColor = '#ffc107'
      break
    case 'info':
      options.bgColor = '#17a2b8'
      break
    case 'light':
      options.bgColor = '#f8f9fa'
      options.textColor = '#000'
      break
    case 'dark':
      options.bgColor = '#343a40'
      break
  }

  $.toast(options);
}
