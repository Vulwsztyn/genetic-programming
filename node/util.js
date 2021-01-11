function stringifySpecimen(specimen) {
  return specimen.type === 'T'
    ? `${specimen.value}`
    : `${specimen.name}(${specimen.children ? specimen.children.map(stringifySpecimen).join(',') : ''})`
}
module.exports = {
  stringifySpecimen,
}
