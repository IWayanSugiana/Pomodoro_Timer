// setup section and initialize work status
let section = 1;
let limit_section = localStorage.getItem('sectionData');
let work = true;

// setup time and initialize timer
let time = new Date().getSeconds();
let iterator = time;
let limit = time + 1500;


const continue_button = document.getElementById('continue_button').addEventListener("click", function(){

    const continue_button = document.getElementById('continue_button').hidden = true;
    document.getElementById('reset_button').hidden = true;
    
    // timer
    const pomodoro = setInterval(function(){

        // print detail
        let section_counter =document.querySelector('.section');
        section_counter.textContent = 'Section : ' + section;
    
        if(work == true){
            let status_monitor =document.querySelector('.status');
            status_monitor.textContent = 'Status : work';
        }
        else{
            let status_monitor =document.querySelector('.status');
            status_monitor.textContent = 'Status : break';
        }
    
        // looping untill limit_section reached
        if(section<=limit_section){
            
            // if case for work condition
            if(work == true){
                const audio = document.querySelector('audio').pause();
                
                iterator++;
                time_diff = limit - iterator;
    
                minutes = Math.floor(time_diff % (60*60) / 60);
                seconds = Math.floor(time_diff % 60);
    
                time_left = document.querySelector('.timer h1');
                time_left.textContent = minutes + 'min ' + seconds + 'sec ';
        
                // if case when work section ended and limit section already reached
                if(time_diff < 0 && section == limit_section)
                {
                    time_left.textContent = "Section Ended";

                    const audio = document.querySelector('audio').play();
                    clearInterval(pomodoro);
                    document.getElementById('reset_button').hidden = false;
                    document.getElementById('continue_button').textContent = "Continue Section"
                }

                // if case when work section ended but limit section haven't reached
                else if(time_diff < 0)
                {
                    time_left.textContent = "time's up";
                    
                    const audio = document.querySelector('audio').play();
                    
                    time = limit;
                    limit = time + 600;
                    work = false;
                    
                    clearInterval(pomodoro);
                    
                    document.getElementById('continue_button').hidden = false;
                    document.getElementById('continue_button').textContent = "Continue Section"
                }
            }
        
            // if case for break condition
            else if(work == false){
                const audio = document.querySelector('audio').pause();
                
                iterator++;
                time_diff = limit - iterator;
                
                minutes = Math.floor(time_diff % (60*60) / 60);
                seconds = Math.floor(time_diff % 60);
        
                time_left = document.querySelector('.timer h1');
                time_left.textContent = minutes + 'min ' + seconds + 'sec ';
        
                if(time_diff < 0)
                {
                    time_left.textContent = "time's up";
                    
                    const audio = document.querySelector('audio').play();

                    time = limit;
                    limit = time + 1500;
                    section += 1;
                    work = true;
                    
                    clearInterval(pomodoro);
                    document.getElementById('continue_button').hidden = false;
                    document.getElementById('continue_button').textContent = "Continue Section"
                }
            }   
        }
    }, 1000)
}); 