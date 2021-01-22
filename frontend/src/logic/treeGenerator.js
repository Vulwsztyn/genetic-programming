const { choose, structuredClone, randomInt } = require('./util')

function countSubNodes(specimen) {
  specimen.subNodesCount =
    1 +
    (!!specimen.children
      ? specimen.children
          .map((x) => {
            countSubNodes(x)
            return x.subNodesCount
          })
          .reduce((x, y) => x + y)
      : 0)
  return specimen
}
function generateTree(mode, functionsMetaArray, leaves, maxLevel, currentLevel = 1) {
  function generate(currentLevel) {
    const choices =
      currentLevel === maxLevel
        ? leaves
        : mode.toLowerCase() === 'full' || currentLevel === 1
        ? functionsMetaArray
        : [...functionsMetaArray, ...leaves]
    const chosen = choose(choices)
    return !chosen.arity
      ? {
          type: 'T',
          value: chosen(),
          level: currentLevel,
        }
      : {
          type: 'F',
          name: chosen.name,
          level: currentLevel,
          children: [...Array(chosen.arity)].map(() => generate(currentLevel + 1)),
        }
  }
  return countSubNodes(generate(currentLevel))
}
function getNode(specimen, numberOfNode, parent = null, childNumber = null) {
  //              10
  //         /         \
  //        5           9
  //       / \           \
  //      2   4           8
  //    / \    \         / \
  //   0   1     3      6   7
  if (numberOfNode === 0 && !specimen.children) {
    return { node: parent, childNumber }
  }
  for (const childNumber in specimen.children) {
    const child = specimen.children[childNumber]
    if (numberOfNode < child.subNodesCount) {
      return getNode(child, numberOfNode, specimen, childNumber)
    } else {
      numberOfNode -= child.subNodesCount
    }
  }
  return { node: parent, childNumber }
}

function mutate(specimen, mode, functionsMetaArray, leaves, maxLevel) {
  const newSpecimen = structuredClone(specimen)
  const numberOfNodeToReplace = randomInt(newSpecimen.subNodesCount - 1)
  //   console.log('numberOfNodeToReplace', numberOfNodeToReplace)
  const { node, childNumber } = getNode(specimen, numberOfNodeToReplace)
  //   console.log(stringifySpecimen(node))
  //   console.log(childNumber)
  node.children[childNumber] = generateTree(mode, functionsMetaArray, leaves, maxLevel, node.level + 1)
  //   console.log(stringifySpecimen(node))
  return countSubNodes(specimen)
}

function crossover(specimen1, specimen2) {
  const newSpecimen1 = structuredClone(specimen1)
  const newSpecimen2 = structuredClone(specimen2)
  const numberOfNodeToReplace1 = randomInt(newSpecimen1.subNodesCount - 1)
  const numberOfNodeToReplace2 = randomInt(newSpecimen2.subNodesCount - 1)
  //   console.log('numberOfNodeToReplace', numberOfNodeToReplace1, numberOfNodeToReplace2)
  const { node: node1, childNumber: childNumber1 } = getNode(newSpecimen1, numberOfNodeToReplace1)
  const { node: node2, childNumber: childNumber2 } = getNode(newSpecimen2, numberOfNodeToReplace2)

  const tmp = node1.children[childNumber1]
  node1.children[childNumber1] = node2.children[childNumber2]
  node2.children[childNumber2] = tmp

  return [countSubNodes(newSpecimen1), countSubNodes(newSpecimen2)]
}

module.exports = {
  generateTree,
  mutate,
  crossover,
}
