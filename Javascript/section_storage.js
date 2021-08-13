// this js file will store user limit section input
const section_value = document.getElementById('section_input');
const section_submit = document.getElementById('section_submit');

section_submit.addEventListener("click", ()=>{
    const section_number = section_value.value;
    localStorage.setItem("sectionData", section_number);
});