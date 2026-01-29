async function check() {
    const pathMod = await import('path');
    console.log('pathMod keys:', Object.keys(pathMod));
    console.log('pathMod.default:', pathMod.default ? 'exists' : 'undefined');
    if (pathMod.default) {
        console.log('pathMod.default.join:', pathMod.default.join ? 'exists' : 'undefined');
    }
    console.log('pathMod.join:', pathMod.join ? 'exists' : 'undefined');
}
check();
