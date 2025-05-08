
function verAveria(){
    const checkboxes = document.querySelectorAll('input[name="sintoma"]:checked');
    let sintoma = [];
    checkboxes.forEach((s) =>
        sintoma.push(s.value)
    );
    console.log(sintoma) 
}

document.querySelectorAll('input[name="sintoma"]').forEach((checkbox) => {
    checkbox.addEventListener('change', verAveria);
});
verAveria();


