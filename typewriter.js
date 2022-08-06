let typewords = [
    "// ah it’s you again." ,
    "",
    "",
    "// so you still want to know how the earthrunners came to be...",
    "",
    "",
    "// i’ll tell you but you’ll have to forgive my tendency to embellish,",
    "",
    "",
    "// with every wave of struggle we lived through, ",
    "the same sets of problems arose time and time again. ",
    "",
    "// fiefdoms of teenage proletarian aggression and lust, ",
    "eating themselves alive in a nihilism of self destruction. ",
    "",
    "// the dynasties of the newly crowned queens were always short and cruel, ",
    "marked by legendary feats of valor, ",
    "the cruelty proportional to glory. ",
    "",
    "// the warrior queens shone like diamonds in their brilliance ",
    "and the breathtaking courage of their acts, ",
    "their innovation and their strategic genius ",
    "burning like a bottle rocket in the night. ",
    "",
    "// and when one queen was dethroned another would take their stead, ",
    "the legends forgotten and the terrorism of the pigs remaining forever unchanged. ",    "",
    "",
    "// a police algorithm crushing our teenage melodramas in the fourth act, ",
    "an endless cycle of death and rebirth and death again. ",
    "",
    "// with each defeat we lost more ground to colonization,",
    "to a permanent incarceration. to a scorched earth.",
    "",
    "// in order to rebuild, ",
    "we had to blindly listen for the reverberations of the struggle. ",
    "",
    "// in cities without airports, a bloody battle began to be fought. ",
    "",
    "// the earth a rallying cry in the face of such inhuman destruction. ",
    "",
    "// pipelines and shipping locks, refineries and filtration plants. ",
    "",
    "// the teenage communes returned with their own science, ",
    "a clarity and strategic vision never seen before. ",
    "",
    "// a dedicated and ongoing inquiry began, ",
    "running scenario after scenario to find a way through this chaos. ",
    "",
    "// The pigs continued to close in on us further,", 
    "sealing us off from the data source entirely.",
    "",
    "then by pure luck, we learned that our elders had saved schematics.",
    "",
    "scattered in unikely places",
    

      ]
      let arr_pos = 0;
      let str_pos = 0;
      let type_space = document.querySelector('#type');
      
      window.setInterval(typeALetter, 100);
      
      function typeALetter() {
        // console.log('str', str_pos);
        // console.log('arr', arr_pos);
        
        let current_letter = typewords[arr_pos].charAt(str_pos);
        type_space.innerHTML += current_letter;
        if (typewords[arr_pos].length >= str_pos) {
          str_pos++;
        } else {
          str_pos = 0;
          type_space.innerHTML += "<br/>";
          arr_pos++;
          
          if (typewords.length <=     arr_pos) {
            type_space.innerHTML = "";
            arr_pos = 0;
          }
      
        }
      }