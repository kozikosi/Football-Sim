import { join } from "node:path"; // deliberately unused import -> noUnusedImports

export function broken() {
  var x = 1; // noVar
  if (x == 1) {
    // noDoubleEquals
    const s = "value is ${x}"; // noTemplateCurlyInString
    console.log(s);
  }
  let y;
  while ((y = nextValue())) {
    // noAssignInExpressions
    break;
  }
  return [1, 2, 3].map((n) => {
    if (n > 1) return n * 2;
    // useIterableCallbackReturn: some paths return undefined
  });
}

function nextValue() {
  return null;
}

export function plain(a) {
  // plain function, target of useExplicitReturnType
  return a + 1;
}
