function message(){
    var name = document.getElementById('name');
    var phone = document.getElementById('phone');
    var email = document.getElementById('email');
    var address = document.getElementById('address');
    var pack = document.getElementById('pack');
    var slot = document.getElementById('slot');
    var dateofvisit = document.getElementById('date-of-visit');
    const success = document.getElementById('success');
    const danger = document.getElementById('danger');

    if(name.value == ' ' || phone.value == ' ' || email.value == ' ' || address.value == ' ' || pack.value == ' ' || slot.value == ' ' || dateofvisit.value == ' '){
        danger.style.display = 'block';
    }else{
        setTimeout(()=>{
            name.value = ''
            phone.value = '' 
            email.value = ''
            address.value = ''
            pack.value = ''  
            slot.value = '' 
            dateofvisit.value = ''
        },2000)
        
        success.style.display = 'block'
    }

    setTimeout(()=>{
        danger.style.display = 'none'
        success.style.display = 'none'
    },4000)

}
