const toSlugCase = (str) => str.replace(/([A-Z])/g, '-$1').toLowerCase()
export default toSlugCase
