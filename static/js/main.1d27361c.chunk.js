(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{106:function(e,t,n){},107:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t),n.d(t,"randomInt",(function(){return c})),n.d(t,"randomIntInRange",(function(){return u})),n.d(t,"trueWithProbabilty",(function(){return s})),n.d(t,"choose",(function(){return l})),n.d(t,"structuredClone",(function(){return b})),n.d(t,"getRandom",(function(){return f})),n.d(t,"sample",(function(){return d})),n.d(t,"stringifyTleaf",(function(){return p})),n.d(t,"stringifySpecimen",(function(){return h})),n.d(t,"chooseOne",(function(){return m})),n.d(t,"tournament",(function(){return j})),n.d(t,"specimenToCode",(function(){return O})),n.d(t,"mapSpecimenToStorable",(function(){return g}));var r=n(25),o=n(8),i=n(87),a=n(16);function c(e){return Math.floor(Math.random()*e)}function u(e,t){return c(t-e)+e}function s(e){return Math.random()<e}function l(e){return e[c(e.length)]}var b=function(e){return JSON.parse(JSON.stringify(e))};function f(e,t){return Math.random()*(t-e)+e}function d(e,t){var n=Object(a.a)(Array(t).keys()).map((function(){return c(e.length)}));return n.sort(),n.map((function(t){return e[t]}))}function p(e){return e.value.length||Number.isInteger(e.value)||"boolean"===typeof e.value?e.value:e.value.toFixed(5)}function h(e){return"T"===e.type?"".concat(p(e)):"".concat(e.name,"(").concat(e.children?e.children.map(h).join(", "):"",")")}function m(e,t){var n=Math.min.apply(Math,Object(a.a)(Object(a.a)(Array(t).keys()).map((function(){return Math.random()}))));return e[Math.floor(n*e.length)]}function j(e,t){var n,r=Object(i.a)(e);try{for(r.s();!(n=r.n()).done;){var o=n.value;if(s(t))return o}}catch(a){r.e(a)}finally{r.f()}return e[e.length-1]}function O(e,t,n){var i=function e(n){var i,c=n.children?n.children.map(e):null;return"T"===n.type?{code:"".concat(p(n)),functionsUsed:{}}:{code:(i=t[n.name]).toCode.apply(i,Object(a.a)(c.map((function(e){return e.code})))),functionsUsed:Object(o.a)(Object(o.a)({},(c?c.map((function(e){return e.functionsUsed})):[]).reduce((function(e,t){return Object(o.a)(Object(o.a)({},e),t)}))),{},Object(r.a)({},n.name,1))}}(e);return"const myFunction = (".concat(n,") => ").concat(i.code,"\n").concat(Object.keys(i.functionsUsed).filter((function(e){return t[e].codeAddition})).map((function(e){return t[e].codeAddition})).join("\n"))}function g(e,t,n){return{function:h(e),fitness:e.fitness.toFixed(5),code:O(e,t,n)}}},333:function(e,t,n){"use strict";n.r(t),n.d(t,"specimenEvaluator",(function(){return o}));var r=n(16);function o(e){return function t(n,o){var i;return"F"===o.type?(i=e[o.name]).function.apply(i,Object(r.a)(o.children.map((function(e){return t(n,e)})))):function(e){var t;return null!==(t=n[e.value])&&void 0!==t?t:e.value}(o)}}},334:function(e,t,n){"use strict";n.r(t),n.d(t,"generateTree",(function(){return s})),n.d(t,"mutate",(function(){return b})),n.d(t,"crossover",(function(){return f}));var r=n(16),o=n(22),i=o.choose,a=o.structuredClone,c=o.randomInt;function u(e){return e.subNodesCount=1+(e.children?e.children.map((function(e){return u(e),e.subNodesCount})).reduce((function(e,t){return e+t})):0),e}function s(e,t,n,o){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1;function c(a){var u=a===o?n:"full"===e.toLowerCase()||1===a?t:[].concat(Object(r.a)(t),Object(r.a)(n)),s=i(u);return s.arity?{type:"F",name:s.name,level:a,children:Object(r.a)(Array(s.arity)).map((function(){return c(a+1)}))}:{type:"T",value:s(),level:a}}return u(c(a))}function l(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;if(0===t&&!e.children)return{node:n,childNumber:r};for(var o in e.children){var i=e.children[o];if(t<i.subNodesCount)return l(i,t,e,o);t-=i.subNodesCount}return{node:n,childNumber:r}}function b(e,t,n,r,o){var i=a(e),b=l(e,c(i.subNodesCount-1)),f=b.node,d=b.childNumber;return f.children[d]=s(t,n,r,o,f.level+1),u(e)}function f(e,t){var n=a(e),r=a(t),o=c(n.subNodesCount-1),i=c(r.subNodesCount-1),s=l(n,o),b=s.node,f=s.childNumber,d=l(r,i),p=d.node,h=d.childNumber,m=b.children[f];return b.children[f]=p.children[h],p.children[h]=m,[u(n),u(r)]}},335:function(e,t){function n(e,t,n){return t.map((function(t){return t.y-e(t,n)})).map((function(e){return e*e})).reduce((function(e,t){return e+t}))}e.exports={fitness:n,assignFitness:function(e,t,r){return r.fitness=Number(n(e,t,r).toFixed(5)),r}}},336:function(e,t,n){"use strict";n.r(t);var r=n(4),o=n(0),i=n.n(o),a=n(11),c=n.n(a),u=(n(106),n(107),n(31)),s=n.n(u),l=n(50),b=n(46),f=n(397),d=n(399),p=n(387),h=n(400),m=n(385),j=n(394),O=n(379),g=n(384),v=n(36),y=n(398),S=n(382),x=n(68),N={en:{translation:n(76)},pl:{translation:n(77)}};x.a.init({resources:N,lng:"en",fallbackLng:"en",keySeparator:!1,interpolation:{escapeValue:!1}});var F=x.a,T=n(14),C=Object(O.a)((function(e){return{root:{flexGrow:1,"& .MuiTextField-root":{margin:e.spacing(1),width:"25ch"},button:{padding:e.spacing(3)}}}}));var G=Object(v.b)((function(e){return{problemType:e.problemType,populationSize:e.populationSize,numberOfGenerations:e.numberOfGenerations,maxTreeDepth:e.maxTreeDepth,tournamentSize:e.tournamentSize,tournamentWinningProbability:e.tournamentWinningProbability,crossoverProbability:e.crossoverProbability,pointsRaw:e.pointsRaw,leavesRaw:e.leavesRaw,functions:e.functions,algorithmState:e.algorithmState,currentGeneration:e.currentGeneration,desiredGeneration:e.desiredGeneration}}),(function(e){return{setValue:function(t,n){return e({type:"INPUT_CHANGE",value:n,field:t})},setFunction:function(t){return e({type:"SET_FUNCTION",name:t.target.name,value:t.target.checked})},resetAlgorithmState:function(){return e({type:"SET_ALGORITHM_STATE",value:"BEFORE_RUN"})},setDesiredGeneration:function(t){return e({type:"SET_DESIRED_GENERAION",value:t})}}}))((function(e){var t=e.algorithm,n=e.problemType,i=e.populationSize,a=(e.numberOfGenerations,e.maxTreeDepth),c=e.tournamentSize,u=(e.tournamentWinningProbability,e.crossoverProbability),O=e.pointsRaw,v=e.leavesRaw,x=e.setValue,N=e.functions,G=e.setFunction,w=e.algorithmState,E=e.resetAlgorithmState,k=e.currentGeneration,P=e.setDesiredGeneration,R=e.desiredGeneration,z=Object(T.g)().lang;F.changeLanguage(z);var M=C(),A=Object(o.useState)(5),I=Object(b.a)(A,2),_=I[0],B=I[1],U=function(e){return e[0].toUpperCase()+e.slice(1)},D=Object(o.useCallback)((function(){"BEFORE_RUN"!==w?t.createNextGeneration():t.startAndCreateFirstGeneration()}),[t,w]),L=function(){var e=Object(l.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:P(Number(k)+Number(_)),D();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(o.useEffect)((function(){setTimeout((function(){Number(k)<Number(R)&&D()}),0)}),[D,k,R]),Object(o.useEffect)((function(){document.title=F.t("title")}),[]),Object(r.jsxs)("form",{className:M.root,noValidate:!0,autoComplete:"off",children:[Object(r.jsxs)(S.a,{container:!0,spacing:2,children:[Object(r.jsx)(S.a,{item:!0,xs:12,children:Object(r.jsx)(g.a,{className:M.button,variant:"contained",color:"primary",onClick:function(){t.startAndCreateFirstGeneration()},children:F.t("createFirstGeneration")})}),Object(r.jsx)(S.a,{item:!0,xs:12,children:Object(r.jsx)(g.a,{className:M.button,variant:"contained",color:"primary",onClick:D,children:F.t("createNextGeneration")})}),Object(r.jsx)(S.a,{item:!0,xs:12,children:Object(r.jsx)(g.a,{className:M.button,variant:"contained",color:"primary",onClick:L,children:F.t("runNGenerations")})}),Object(r.jsx)(S.a,{item:!0,xs:12,children:Object(r.jsx)(j.a,{label:F.t("numberOfGenerationsToRun"),type:"number",value:_,onChange:function(e){return B(e.target.value)},InputLabelProps:{shrink:!0},variant:"outlined"})}),Object(r.jsx)(S.a,{item:!0,xs:12,children:Object(r.jsx)(g.a,{className:M.button,variant:"contained",color:"primary",onClick:E,children:"Reset"})})]}),Object(r.jsxs)(S.a,{container:!0,spacing:1,children:[[{name:"populationSize",value:i,stateField:"populationSize"},{name:"maxTreeDepth",value:a,stateField:"maxTreeDepth"},{name:"tournamentSize",value:c,stateField:"tournamentSize"},{name:"crossoverProbability",value:u,stateField:"crossoverProbability"}].map((function(e){var t=e.name,n=e.value,o=e.stateField;return Object(r.jsx)(S.a,{item:!0,xs:12,children:Object(r.jsx)(j.a,{id:t,label:F.t(t),type:"number",value:n,onChange:function(e){return x(o,Number(e.target.value))},InputLabelProps:{shrink:!0},variant:"outlined",disabled:"BEFORE_RUN"!==w},t)})})),Object(r.jsx)(S.a,{item:!0,xs:12,children:Object(r.jsx)(j.a,{id:"points",label:F.t("pointsWithInfo"),multiline:!0,rows:10,value:O,variant:"outlined",onChange:function(e){return x("pointsRaw",e.target.value)}})}),Object(r.jsx)(S.a,{item:!0,xs:12,children:Object(r.jsx)(j.a,{id:"leaves",label:F.t("possibleLeaves"),multiline:!0,rows:10,value:"boolean"===n?"true, false":v,variant:"outlined",onChange:function(e){return x("leavesRaw",e.target.value)},disabled:"boolean"===n})})]}),Object(r.jsxs)(S.a,{container:!0,spacing:1,children:[Object(r.jsx)(S.a,{item:!0,xs:12,children:Object(r.jsxs)(h.a,{component:"fieldset",children:[Object(r.jsx)(m.a,{component:"legend",children:F.t("problemType")}),Object(r.jsx)(d.a,{"aria-label":"problem-type",name:"problem-type",value:n,onChange:function(e){return x("problemType",e.target.value)},children:["real","integer","boolean"].map((function(e){return Object(r.jsx)(p.a,{value:e,control:Object(r.jsx)(f.a,{disabled:"BEFORE_RUN"!==w}),label:U(F.t(e))},e)}))})]})}),Object(r.jsx)(S.a,{item:!0,xs:12,children:Object(r.jsx)(h.a,{component:"fieldset",children:Object.keys(N).map((function(e){return Object(r.jsx)(p.a,{control:Object(r.jsx)(y.a,{checked:N[e],name:e,onChange:function(e){G(e)},disabled:"BEFORE_RUN"!==w},e),label:e})}))})})]})]})})),w=n(391),E=n(393),k=n(389),P=n(390),R=n(392),z=n(388),M=n(386),A=n(337),I=n(396),_=Object(O.a)({table:{}});var B=Object(v.b)((function(e){return{generation:e.currentGeneration,bestSpecimens:e.bestSpecimens,bestSpecimen:e.bestSpecimen}}),(function(e){return{}}))((function(e){var t=e.generation,n=e.bestSpecimens,i=e.bestSpecimen,a=_(),c=Object(o.useState)(null===i||void 0===i?void 0:i.code),u=Object(b.a)(c,2),s=u[0],l=u[1],f=function(e,t,n){return Object(r.jsxs)(z.a,{children:[Object(r.jsx)(k.a,{component:"th",scope:"row",align:"right",children:n||t+1}),Object(r.jsx)(k.a,{align:"right",children:Object(r.jsx)(A.a,{children:e.function})}),Object(r.jsx)(k.a,{align:"right",children:e.fitness}),Object(r.jsx)(k.a,{align:"right",children:Object(r.jsx)(g.a,{variant:"contained",color:"primary",onClick:function(){return l(e.code)},children:F.t("showCode")})})]},t)};return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("h1",{children:["Generation: ",t]}),s||(null===i||void 0===i?void 0:i.code)?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h2",{children:"Code:"}),Object(r.jsx)(I.a,{language:"javascript",lineProps:{style:{wordBreak:"break-all",whiteSpace:"pre-wrap"}},wrapLines:!0,children:s||(null===i||void 0===i?void 0:i.code)})]}):Object(r.jsx)(r.Fragment,{}),Object(r.jsx)(P.a,{component:M.a,children:Object(r.jsxs)(w.a,{className:a.table,"aria-label":"simple table",children:[(i?[i]:[]).map((function(e,t){return f(e,t,F.t("globalBest"))})),Object(r.jsx)(R.a,{children:Object(r.jsxs)(z.a,{children:[Object(r.jsx)(k.a,{align:"right",children:F.t("number")}),Object(r.jsx)(k.a,{align:"right",children:F.t("function")}),Object(r.jsx)(k.a,{align:"right",children:F.t("errorSquared")}),Object(r.jsx)(k.a,{align:"right",children:F.t("showCode")})]})}),Object(r.jsx)(E.a,{children:n.map((function(e,t){return f(e,t)}))})]})})]})}));var U=Object(v.b)((function(e){return{problemType:e.problemType,populationSize:e.populationSize,numberOfGenerations:e.numberOfGenerations,maxTreeDepth:e.maxTreeDepth,tournamentSize:e.tournamentSize,tournamentWinningProbability:e.tournamentWinningProbability,crossoverProbability:e.crossoverProbability,pointsRaw:e.pointsRaw,leavesRaw:e.leavesRaw,functions:e.functions}}),(function(e){return{setFunctions:function(t){return e({type:"SET_FUNCTIONS",functions:t})},setAlgorithmState:function(t){return e({type:"SET_ALGORITHM_STATE",value:t})},setCurrentGeneration:function(t){return e({type:"SET_CURRENT_GENERATION",value:t})},setBestSpecimens:function(t){return e({type:"SET_BEST_SPECIMENS",value:t})},setBestSpecimen:function(t){return e({type:"SET_BEST_SPECIMEN",value:t})}}}))((function(e){var t=e.algorithm,n=e.problemType,o=e.populationSize,i=e.numberOfGenerations,a=e.maxTreeDepth,c=e.tournamentSize,u=e.tournamentWinningProbability,s=e.crossoverProbability,l=e.pointsRaw,b=e.leavesRaw,f=e.setFunctions,d=e.functions,p=e.setAlgorithmState,h=e.setCurrentGeneration,m=e.setBestSpecimens,j=e.setBestSpecimen;return t.setProperty("populationSize",Number(o)),t.setProperty("numberOfGenerations",Number(i)),t.setProperty("maxTreeDepth",Number(a)),t.setProperty("tournamentSize",Number(c)),t.setProperty("tournamentWinningProbability",Number(u)),t.setProperty("crossoverProbability",Number(s)),t.setProperty("pointsRaw",l),t.setProperty("leavesRaw",b),0!==Object.keys(d).length?t.setUserSelectedFunctions(d):f(t.getUserSelectedFunctions()),console.log(n,t.problemType),console.log(n!==t.problemType),n!==t.problemType&&(t.setProperty("problemType",n),f(t.getUserSelectedFunctions())),t.setReduxSetters({setAlgorithmState:p,setCurrentGeneration:h,setBestSpecimens:m,setBestSpecimen:j}),Object(r.jsx)(r.Fragment,{})})),D=n(16),L=n(8),W=n(25),q=n(85),V=n(86),J=n(22),H=function(e,t){return 0!==t?e/t:e},X=function(e,t){return e>0&&t>0&&1!==e?Math.log(t)/Math.log(e):0},Z=function(e){return Math.sqrt(Math.abs(e))},K=function(e,t){return e&&!t||!e&&t},Q=function(e,t,n){return e?t:n},Y=n(395).a((function(e,t){return Object(L.a)(Object(L.a)({},e),{},{name:t,arity:e.function.length})}))({add:{function:function(e,t){return e+t},toCode:function(e,t){return"(".concat(e," + ").concat(t,")")},onlyFor:["integer","real"]},subtract:{function:function(e,t){return e-t},toCode:function(e,t){return"(".concat(e," - ").concat(t,")")},onlyFor:["integer","real"]},multiply:{function:function(e,t){return e*t},toCode:function(e,t){return"".concat(e," * ").concat(t)},onlyFor:["integer","real"]},divide:{function:function(e,t){return e/t},toCode:function(e,t){return"".concat(e," / ").concat(t)},onlyFor:["integer","real"]},protectedDivide:{function:H,toCode:function(e,t){return"protectedDivide(".concat(e,", ").concat(t,")")},codeAddition:"const protectedDivide = ".concat(H.toString()),onlyFor:["integer","real"]},min:{function:function(e,t){return Math.min(e,t)},toCode:function(e,t){return"Math.min(".concat(e,", ").concat(t,")")},onlyFor:["integer","real"]},max:{function:function(e,t){return Math.max(e,t)},toCode:function(e,t){return"Math.max(".concat(e,", ").concat(t,")")},onlyFor:["integer","real"]},exp:{function:function(e){return Math.exp(e)},toCode:function(e){return"Math.exp(".concat(e,")")},onlyFor:["integer","real"]},pow:{function:function(e,t){return Math.pow(e,t)},toCode:function(e,t){return"Math.pow(".concat(e,", ").concat(t,")")},onlyFor:["integer","real"]},log:{function:function(e,t){return Math.log(t)/Math.log(e)},toCode:function(e,t){return"Math.log(".concat(t,") / Math.log(").concat(e,")")},onlyFor:["integer","real"]},protectedLog:{function:X,toCode:function(e,t){return"protectedLog(".concat(e,", ").concat(t,")")},codeAddition:"const protectedLog = ".concat(X.toString()),onlyFor:["integer","real"]},sin:{function:function(e){return Math.sin(e)},toCode:function(e){return"Math.sin(".concat(e,")")},onlyFor:["integer","real"]},cos:{function:function(e){return Math.cos(e)},toCode:function(e){return"Math.cos(".concat(e,")")},onlyFor:["integer","real"]},sqrt:{function:function(e){return Math.sqrt(e)},toCode:function(e){return"Math.sqrt(".concat(e,")")},onlyFor:["integer","real"]},protectedSqrt:{function:Z,toCode:function(e){return"protectedSqrt(".concat(e,")")},codeAddition:"const protectedSqrt = ".concat(Z.toString()),onlyFor:["integer","real"]},neg:{function:function(e){return-e},toCode:function(e){return"-".concat(e)},onlyFor:["integer","real"]},bitwiseOr:{function:function(e,t){return e|t},toCode:function(e,t){return"(".concat(e," | ").concat(t,")")},onlyFor:["integer"]},bitwiseAnd:{function:function(e,t){return e&t},toCode:function(e,t){return"(".concat(e," & ").concat(t,")")},onlyFor:["integer"]},bitwiseXor:{function:function(e,t){return e^t},toCode:function(e,t){return"(".concat(e," ^ ").concat(t,")")},onlyFor:["integer"]},or:{function:function(e,t){return e|t},toCode:function(e,t){return"(".concat(e," || ").concat(t,")")},onlyFor:["boolean"]},and:{function:function(e,t){return e&&t},toCode:function(e,t){return"(".concat(e," && ").concat(t,")")},onlyFor:["boolean"]},xor:{function:K,toCode:function(e,t){return"bitwiseXor(".concat(e,", ").concat(t,")")},codeAddition:"const bitwiseXor = ".concat(K.toString()),onlyFor:["boolean"]},ifThenElse:{function:Q,toCode:function(e,t,n){return"ifThenElse(".concat(e,", ").concat(t,", ").concat(n,")")},codeAddition:"const ifThenElse = ".concat(Q.toString()),onlyFor:["boolean"]},not:{function:function(e){return!e},toCode:function(e){return"!(".concat(e,")")},onlyFor:["boolean"]},equalsNumeric:{function:function(e,t){return e===t?1:0},toCode:function(e,t){return"(".concat(e," === ").concat(t," ? 1 : 0)")},onlyFor:["integer","real"]},gtNumeric:{function:function(e,t){return e>t?1:0},toCode:function(e,t){return"(".concat(e," > ").concat(t," ? 1 : 0)")},onlyFor:["integer","real"]},ltNumeric:{function:function(e,t){return e>t?1:0},toCode:function(e,t){return"(".concat(e," > ").concat(t," ? 1 : 0)")},onlyFor:["integer","real"]},equals:{function:function(e,t){return e===t},toCode:function(e,t){return"(".concat(e," === ").concat(t," ? true : false)")},onlyFor:["boolean"]},gt:{function:function(e,t){return e>t},toCode:function(e,t){return"(".concat(e," > ").concat(t," ? true : false)")},onlyFor:["boolean"]},lt:{function:function(e,t){return e>t},toCode:function(e,t){return"(".concat(e," > ").concat(t," ? true : false)")},onlyFor:["boolean"]}}),$=n(401),ee=n(333).specimenEvaluator,te=n(334),ne=te.generateTree,re=te.mutate,oe=te.crossover,ie=n(335).assignFitness,ae=function(){function e(){Object(q.a)(this,e),this.problemType="real",this.running=!1,this.mode="Fullnt",this.reduxSetters={},this.functions=Y,this.inputVariables=[],this.calculateUsableFuncitons(),this.evaluate=ee(Y),this.currentGenerationNumber=0,console.log({functions:Y}),this.sortingFunction=function(e,t){return isNaN(e.fitness)?1:isNaN(t.fitness)?-1:e.fitness>t.fitness?1:t.fitness>e.fitness?-1:e.subNodesCount>t.subNodesCount?1:t.subNodesCount>e.subNodesCount?-1:0}}return Object(V.a)(e,[{key:"calculateUsableFuncitons",value:function(){var e=this;console.log(this.problemType),this.functionsArray=Object.values(Y).filter((function(t){return t.onlyFor.includes(e.problemType)})),this.userSelectedFunctions=$.a(Object.keys(this.functions).filter((function(t){return e.functions[t].onlyFor.includes(e.problemType)})).map((function(e){return Object(W.a)({},e,!0)}))),console.log("test:",this.userSelectedFunctions),console.log($.a(Object.keys(this.functions).filter((function(t){return e.functions[t].onlyFor.includes(e.problemType)})).map((function(e){return Object(W.a)({},e,!0)}))))}},{key:"getUserSelectedFunctions",value:function(){return console.log(this.userSelectedFunctions),this.userSelectedFunctions}},{key:"setUserSelectedFunctions",value:function(e){var t=this;this.userSelectedFunctions=$.a(Object.keys(this.userSelectedFunctions).map((function(t){return Object(W.a)({},t,!!e[t])}))),this.functionsArray=Object.values(this.functions).filter((function(n){return!!e[n.name]&&n.onlyFor.includes(t.problemType)}))}},{key:"setReduxSetters",value:function(e){this.reduxSetters=Object(L.a)(Object(L.a)({},this.reduxSetters),e)}},{key:"setProperty",value:function(e,t){this[e]=t,"problemType"===e&&this.calculateUsableFuncitons()}},{key:"parsePoints",value:function(){var e={real:function(e){return Number(e)},integer:function(e){return Math.round(Number(e))},boolean:function(e){return["true","1"].includes(e.trim().toLowerCase())}}[this.problemType];this.points=this.pointsRaw.split("\n").map((function(t){var n=t.split(",").map((function(t){return e(t)})),r=n.slice(0,-1),o=n.slice(-1)[0];return Object(L.a)(Object(L.a)({},r.reduce((function(e,t){return{value:Object(L.a)(Object(L.a)({},e.value),{},Object(W.a)({},"x".concat(e.i),t)),i:e.i+1}}),{value:{},i:0}).value),{},{y:o})})),console.log({points:this.points})}},{key:"parseLeaves",value:function(){var e=this,t="boolean"!==this.problemType?this.leavesRaw.split("\n").map((function(t){if((a=t).startsWith("(")&&a.endsWith(")")){var n=t.slice(1,-1).split(",").map((function(e){return Number(e)})),r=Object(b.a)(n,2),o=r[0],i=r[1];return"real"===e.problemType?function(){return Object(J.getRandom)(o,i)}:function(){return Object(J.randomIntInRange)(o,i)}}return function(){return Number(t)};var a})):[!0,!1].map((function(e){return function(){return e}}));this.inputVariables=Object.keys(this.points[0]).filter((function(e){return"y"!==e}));var n=this.inputVariables.map((function(e){return function(){return e}}));this.leavesFunctions=[].concat(Object(D.a)(t),Object(D.a)(n))}},{key:"createGenerationZero",value:function(){var e=this,t=Object(D.a)(Array(this.populationSize).keys()).map((function(){return ne("",e.functionsArray,e.leavesFunctions,e.maxTreeDepth)}));t.forEach((function(t){return ie(e.evaluate,e.points,t)})),t.sort(this.sortingFunction),this.generation=t}},{key:"generateNextGeneration",value:function(){var e=Object(l.a)(s.a.mark((function e(){var t,n,r,o,i,a,c,u,l,f=this;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(t=Object(D.a)(Array(this.populationSize).keys()),n=0;n<t.length;)n<t.length-1&&Object(J.trueWithProbabilty)(this.crossoverProbability)?(r=Object(J.chooseOne)(this.generation,this.tournamentSize),o=Object(J.chooseOne)(this.generation,this.tournamentSize),i=oe(r,o),a=Object(b.a)(i,2),c=a[0],u=a[1],t[n]=c,n++,t[n]=u,n++):(l=Object(J.chooseOne)(this.generation,this.tournamentSize),t[n]=re(l,this.mode,this.functionsArray,this.leavesFunctions,this.maxTreeDepth),n++),n%5e3===0&&console.log(n);t.forEach((function(e){return ie(f.evaluate,f.points,e)})),t.sort(this.sortingFunction),this.newGeneration=t;case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"setBestSpecimensRedux",value:function(){var e=this;this.reduxSetters.setBestSpecimens(this.generation.slice(0,10).map((function(t){return Object(J.mapSpecimenToStorable)(t,e.functions,e.inputVariables)})))}},{key:"startAndCreateFirstGeneration",value:function(){this.reduxSetters.setAlgorithmState("RUNNING"),this.parsePoints(),this.parseLeaves(),this.currentGenerationNumber=1,this.reduxSetters.setCurrentGeneration(this.currentGenerationNumber),this.createGenerationZero(),this.bestSpecimen=Object(J.structuredClone)(this.generation[0]),this.reduxSetters.setBestSpecimen(Object(J.mapSpecimenToStorable)(this.bestSpecimen,this.functions,this.inputVariables)),this.setBestSpecimensRedux()}},{key:"createNextGeneration",value:function(){var e=Object(l.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.parsePoints(),this.parseLeaves(),this.currentGenerationNumber++,this.reduxSetters.setCurrentGeneration(this.currentGenerationNumber),e.next=6,this.generateNextGeneration();case 6:this.generation=this.newGeneration,this.setBestSpecimensRedux(),t=this.generation[0],1===this.sortingFunction(this.bestSpecimen,t)&&(this.bestSpecimen=Object(J.structuredClone)(t),this.reduxSetters.setBestSpecimen(Object(J.mapSpecimenToStorable)(this.bestSpecimen,this.functions,this.inputVariables)));case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"runIfNotFinished",value:function(){var e=Object(l.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.parsePoints(),this.parseLeaves(),!(this.currentGenerationNumber>=this.numberOfGenerations)){e.next=4;break}return e.abrupt("return",!0);case 4:if(0!==this.currentGenerationNumber){e.next=8;break}this.startAndCreateFirstGeneration(),e.next=10;break;case 8:return e.next=10,this.createNextGeneration();case 10:return e.abrupt("return",!1);case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}();function ce(){var e=new ae;return Object(r.jsxs)("div",{className:"App",children:[Object(r.jsxs)(S.a,{container:!0,children:[Object(r.jsx)(S.a,{item:!0,xs:12,sm:6,md:3,lg:2,children:Object(r.jsx)(G,{algorithm:e})}),Object(r.jsx)(S.a,{item:!0,xs:12,sm:6,md:9,lg:10,children:Object(r.jsx)(B,{})})]}),Object(r.jsx)(U,{algorithm:e})]})}var ue=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,403)).then((function(t){var n=t.getCLS,r=t.getFID,o=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),r(e),o(e),i(e),a(e)}))},se=n(52),le={problemType:"real",populationSize:25e3,desiredGeneration:0,maxTreeDepth:6,tournamentSize:50,crossoverProbability:.5,pointsRaw:Object(D.a)(Array(20).keys()).map((function(e){var t=e/10;return{x:t.toFixed(2),y:(t*t-t).toFixed(2)}})).map((function(e){var t=e.x,n=e.y;return"".concat(t,", ").concat(n)})).join("\n"),leavesRaw:["1","-1","(-10,10)"].join("\n"),functions:{},bestSpecimens:[],bestSpecimen:null,currentGeneration:"0",algorithmState:"BEFORE_RUN"},be=n(64),fe=n(88),de=Object(se.createStore)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:le,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INPUT_CHANGE":return"RUNNING"===e.algorithmState?e:Object(L.a)(Object(L.a)({},e),{},Object(W.a)({},t.field,t.value));case"SET_FUNCTIONS":return Object(L.a)(Object(L.a)({},e),{},{functions:t.functions});case"SET_FUNCTION":return Object(L.a)(Object(L.a)({},e),{},{functions:Object(L.a)(Object(L.a)({},e.functions),{},Object(W.a)({},t.name,t.value))});case"SET_ALGORITHM_STATE":return Object(L.a)(Object(L.a)({},e),{},{algorithmState:t.value,desiredGeneration:"BEFORE_RUN"===t.value?0:e.desiredGeneration});case"SET_CURRENT_GENERATION":return Object(L.a)(Object(L.a)({},e),{},{currentGeneration:t.value});case"SET_BEST_SPECIMENS":return Object(L.a)(Object(L.a)({},e),{},{bestSpecimens:t.value});case"SET_BEST_SPECIMEN":return Object(L.a)(Object(L.a)({},e),{},{bestSpecimen:t.value});case"SET_DESIRED_GENERAION":return Object(L.a)(Object(L.a)({},e),{},{desiredGeneration:t.value});default:return e}}),Object(fe.composeWithDevTools)());c.a.render(Object(r.jsx)(v.a,{store:de,children:Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsxs)(be.a,{children:[Object(r.jsx)(T.b,{exact:!0,path:"/genetic-programming",children:Object(r.jsx)(T.a,{to:"/genetic-programming/en"})}),Object(r.jsx)(T.d,{children:Object(r.jsx)(T.b,{path:"/genetic-programming/:lang",children:Object(r.jsx)(ce,{})})})]})})}),document.getElementById("root")),ue()},76:function(e){e.exports=JSON.parse('{"populationSize":"Population Size","maxTreeDepth":"Max Tree Depth","tournamentSize":"Tournament Size","crossoverProbability":"Crossover Probability","pointsWithInfo":"Points (last column is y)","possibleLeaves":"Possible leaves","problemType":"Problem Type","real":"Real","integer":"Integer","boolean":"Boolean","createFirstGeneration":"Create First Generation","createNextGeneration":"Create Next Generation","runNGenerations":"Run N Generations","numberOfGenerationsToRun":"Number of Generations To Run","generation":"Generation","code":"Code","number":"Number","function":"Function","errorSquared":"Error Squared","showCode":"Show Code","globalBest":"Global Best","title":"Genetic Programming"}')},77:function(e){e.exports=JSON.parse('{"populationSize":"Wielko\u015b\u0107 Populacji","maxTreeDepth":"Maksymalna G\u0142\u0119boko\u015b\u0107 Drzewa","tournamentSize":"Wielko\u015b\u0107 turnieju","crossoverProbability":"Prawdopodobie\u0144swto krzy\u017cowania","pointsWithInfo":"Punkty (ostatnia kolumna to y)","possibleLeaves":"Mo\u017cliwe li\u015bcie","problemType":"Typ Problemu","real":"Rzeczywistoliczbowy","integer":"Ca\u0142kowitoliczbowy","boolean":"Boolowski","createFirstGeneration":"Stw\xf3rz Pierwsze Pokolenie","createNextGeneration":"Stw\xf3rz Nast\u0119pne Pokolenie","runNGenerations":"Stw\xf3rz N Pokole\u0144","numberOfGenerationsToRun":"Liczba Pokole\u0144 do Stworzenia","generation":"Pokolenie","code":"Kod","number":"Liczba Porz\u0105dkowa","function":"Funkcja","errorSquared":"B\u0142\u0105d^2","showCode":"Poka\u017c kod","globalBest":"Globalnie Najlepszy","title":"Programowanie Genetyczne"}')}},[[336,1,2]]]);
//# sourceMappingURL=main.1d27361c.chunk.js.map