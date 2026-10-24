// Violating file - should trigger warnings/errors
var x = 1;  // noVar warning
var y = 2;  // noVar warning

function test() {
  if (true == true) { } // noConstantCondition error
  
  var x = 1;  // noVar warning
  var x = 2;  // noRedeclare error
  
  var obj = { a: 1, a: 2 }; // noDuplicateObjectKeys error
  
  function unused() { } // noUnusedVariables warn
  
  if (x = 1) { } // noAssignInExpressions warn
  
  if (x == 1) { } // noDoubleEquals warn
  
  function unreachable() {
    return 1;
    console.log("unreachable"); // noUnreachable error
  }
}
