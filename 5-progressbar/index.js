const progress = document.getElementById('progress')
const circles = document.querySelectorAll('.circle')
const prev = document.getElementById('pre')
const next = document.getElementById('next')


let currentActive = 1

next.addEventListener('click',()=>{
  currentActive++
  if(currentActive>circles.length){
    currentActive=4
  }
  console.log('##next',currentActive);
  updateStyle()
})

prev.addEventListener('click',()=>{
  currentActive--
  if(currentActive<1){
    currentActive=1
  }
  console.log('##prev',currentActive);
  updateStyle()
})

function updateStyle(){
  circles.forEach((circle,index)=>{
    if(index<currentActive){
      circle.classList.add('active')
    }else{
      circle.classList.remove('active')
    }
  })
  progress.style.width=((currentActive-1)/(circles.length-1))*100+'%'

  if(currentActive===1){
    prev.disabled=true
  }else{
    prev.disabled = false
  }
  
  if(currentActive===circles.length){
    next.disabled=true
  }else{
    next.disabled = false
  }
}

