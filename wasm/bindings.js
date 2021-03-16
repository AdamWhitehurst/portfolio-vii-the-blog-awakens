

export function save (arg0) {
    // Create an Object url from UInt8Array `arg0`
    const url = URL.createObjectURL(new File([arg0.buffer], 'roguie_save', {type: 'application/octet-stream'}))
    // Create a link element for url   
    const link = document.createElement('a');
    // set element to url
    link.href = url;
    // click that link to automatically trigger the downlaod popup
    link.click();
}
