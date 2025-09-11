const parseError = (error) => {
  if (error.response) {
    return error.response.data?.message || 'Something went wrong'
  } else if (error.request) {
    return 'Network Error. Please try again'
  } else {
    return error.message || 'Unexpected Error. Please try again'
  }
}

export default parseError
