# Genetic Programming 

## Intro
The goal of this project was to create a website that enables the user to generate a mathematical function best approximating values for given points. The website is hosted at https://vulwsztyn.github.io/genetic-programming/.

## Regular human readable explanation of what's going on

### Assumptions

Let's assume that you are assigned a task that this program solves and are given a set of points and are to create a function that best approximates them. Let's also assume that you know nothing about linear regression, Newton's method, and such, but you are extremely fast at generating random functions and how close their value is to the given points (because computers are).

### How is the "random" function generated (by example)

You are given a set of functions `sin, cos, multiply, add, log` and values `x0, 1, 0, 2, range(-10,10)` (where range means that you can choose any value from the range).

To choose a function or value you could use a manual random number generator i.e. a die.

In the following example I will omit all "Let's assume"s.

The process starts with choosing a function `sin`. `sin` is a unary function (has only one parameter), so now you need to choose a random function or value again. So our random function now looks like this `sin(_)` (`_` are to be filled in later steps).

You choose multiplication to fill the gap. Multiplication has 2 parameters, so now the function is: `sin(_*_)` and you need to choose 2 functions or values to fill the gaps. 

You choose `range(-10,10)` and `log`. I deliberately chose range to show how it works. You generate (e.g. with python) one random number from the range (real if the domain is real, int if it is int). You generated -6. So our function looks like this `sin(-6*log(_,_))`.

There is a restriction on number of "levels" the function can have, so if it were `3` you would need to choose a value not a value or function to fill the gaps. Let's once again assume so.

You choose `2` and `x0` to fill the gaps. So the final function you generated is `sin(-6*log(2,x0))`.

It may or may not be the greatest approximation of the given points, but fret not, as you are extremely fast at function generation you create `24999` more functions. Some of them approximate the points better some worse. Congratulations you have just created a generation of functions (specimen).

### How are the following generations created?

The next generations are not created as randomly as the first. They are created by mutation or cross-over between the current population.

Mutation works in the following way: you choose one specimen e.g. `sin(-6*log(2,x0))` and choose which part of it to mutate i.e. replace. You choose `log`, so you remove `log` with its parameters and replace it with the `_`: `sin(-6*_)` and you act as if you were just creating the function again choosing functions or values to fill the gaps. You could create `sin(-6*(x0+4))` or `sin(-6*x0)` or `sin(-6*cos(2))` (yes, it is constant), etc.

Cross-over is performed by choosing 2 specimen and switching parts of them. You chose `log(x0,(4*x0))+sin(cos(2))` and `2*log(4,log(2,x0))`. From the first you choose `(4*x0)` from the second `2`. Crossover generates the following "children": `log(x0,2)+sin(cos(2))` and `(4*x0)*log(4,log(2,x0))`.

The creation of "children" by mutation or cross-over is performed until their number is equal to the number of specimen in the previous generation, then the "children" become a new generation and the process begins anew until the limit of generations is reached.

### How are specimen evaluated?

The specimen function is passed the points in order to calculate their value. Please notice that the last value of point is never treated as input. e.g for point `2, 4` `x0 = 2` and `y = 4` and y is never a functions parameters, likewise `0, 1, 1, 1` means that `x0 = 0, x1 = 1, x2 = 1, y = 1`. 

Then the difference between the functions output and the user-given value (`y`) is calculated. Error is then squared. Sum of squared errors for each point is the fitness of specimen. The lesser the fitness the better the approximation.

## UI

The user is presented with a number of input fields to tweak the parameters of the genetic programming algorithm.

- `Problem type` - defines whether the problem should generate a function meant for real numbers, integers, or booleans. Influences the set of possible functions.
- `Population size` - defines how many specimens should a generation contain
- `Max tree depth` - defines maximal depth of the equation tree generated by the algorithm
- `Tournament Size` - defines how many specimens enter the tournament. The best wins.
- `Crossover Probability` - probability of choosing crossover operation instead of mutation to creates next specimen(s).
- `Complexity penalty` - value added to fitness for every node (function or value) in equation tree of a function for sorting. Changing it will set "Global best" to the best specimen from current generation if a generation exists.
- `Points` -  points to be approximated
- `Possible leaves` - defines the possible values in leaves of the equation tree, a line should contain either a value (e.g. `3.14`) or a range (e.g. `(-10,10)`), disabled for booleans. Automatically contains all variables (i.e. `x0, x1, x2, ...`).
- `Possible functions` - defines a set of functions that can be used to create the equation tree

The user is also presented with 4 buttons:
- `Create first generation` - create a generation of `Population size` random specimens, disables most of input fields
- `Create next generation` - create a generation of `Population size` specimens, if a generation is already created then as its offspring otherwise random
- `Create n generations` - equivalent to clicking `Create next generation` `n` times - `n` is a value from the following input field
- `Reset` - enables inputs and resets the population

## Logic
### Example specimen:
![Equation Tree](/assets/eq_as_tree.png)

Algorithm generates a population of specimen that can be typed so:
```javascript
interface TNode { // leaf node
    type: 'T'
    value: Number | boolean 
    level: Number // integer
}
interface FNode { // function node
    type: 'F'
    name: string 
    level: Number // integer
    children?: Node[], // parameters of a function, length is equal to the arity of the function
}
type Node = TNode | FNode
```

If the generation is the first one the specimen are generated randomly (uniformly) from all possible values of the node, that is all user selected functions and leaf values. A generation is always sorted by fitness.

If the generation is not the first one it is generated by mutation and crossing over of the specimen from previous generation. Whether next specimen(s) will be created by mutation or crossover is random (with probability of crossover equal to `Crossover Probability` parameter). Mutation generates one child from one "parent", crossover generates two children from two "parents".

All parents are chosen by tournament i.e. since the generation is sorted by fitness a `Tournament Size` of indexes is randomly generated and the lowest is chosen.

Mutation is the replacement of a random node in the specimen with a new randomly generated node.

Crossover is the exchange of randomly chosen nodes (subtrees) from both parents.