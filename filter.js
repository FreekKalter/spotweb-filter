var already_injected;

function sharedStart(array){
    var A= array.concat().sort(), a1= A[0], a2= A[A.length-1], L= a1.length, i= 0;
    while(i<L && a1.charAt(i)=== a2.charAt(i)) i++;
    return a1.substring(0, i);
}

function cleanup(){
    var links = Array.from(document.querySelectorAll("tr > td.title > a.spotlink"));
    var table = document.getElementById('spots');

    var ass_array = {};
    links.forEach(function(a, index){
        var found = false;
        for(comp in ass_array){
            shared = sharedStart([comp, a.text]);
            if(shared.length/a.text.length > 0.6){
                found = true;
                ass_array[comp].push(a);
                // console.log(s_text, "\n", a.text.length, shared.length, shared.length/a.text.length);
            }
        }
        if(!found){
            ass_array[a.text] = [a];
        }
    });

    for(comp in ass_array){
        if(ass_array[comp].length > 1){
            var found = -1;
            for(index in ass_array[comp]){
                a = ass_array[comp][index];
                if(a.text.lastIndexOf('1080') > 0){
                    found = index;
                    break;
                }
            }
            if(found >= 0){
                for(var i=0; i<ass_array[comp].length; i++){
                    if(i != found){
                        console.log('removing: ', ass_array[comp][i].text);
                        table.removeChild(ass_array[comp][i].parentNode.parentNode);
                    }
                }
            }
        }
    }
}

if(!already_injected){
    window.onscroll = function(){
        console.log('scroll');
        cleanup();
    };
    cleanup();
    console.log('content_script loaded');
    already_injected = true;
}
