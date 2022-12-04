
class Simulation {


    constructor(proba_sick){

        this.proba_sick = proba_sick;
        this.board = []
        this.speed = 10
        this.defaultLoopsPerInterval = 1;
        this.intervalID;
        this.k=0
        this.stop=false
        this.nbr_sick = 1
        this.nbr_pot_sick = 0
        this.stop=false
       

    }

    setstop(stop){
        this.stop= stop
    }

    setup(){

        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext("2d");

        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
        this.board = []
        this.nbr_sick = 1
        this.nbr_pot_sick = 0

        this.fill_population()
        this.draw_board()
        document.getElementById("nbr_sick_").innerHTML = this.nbr_sick
        document.getElementById("nbr_pot_sick_").innerHTML = this.nbr_pot_sick
    }

    start_simu(){

        let vector_sick = []
        this.k = 0;
		
        console.log("start while loop")
        for(let i = 0;i<this.canvas.width;i++){
            for(let j=0;j<this.canvas.width;j++){
                if(this.board[i*this.canvas.width+j].getstate()==1 && this.board[i*this.canvas.width+j].getsaw() == false  && this.checkcase(i,j) >= 1){
                    // console.log(this.board[i*this.canvas.width+j].getstate())
                    // console.log(this.board[i*this.canvas.width+j].getsaw())
                    // console.log(this.checkcase(i,j) >= 1)
                    // console.log( this.board[i*this.canvas.width+j])
                    this.board[i*this.canvas.width+j].setstate(2);
                    this.board[i*this.canvas.width+j].setsaw(true);
                    // console.log("sick")
                    // console.log("{i,j}",i,j)
                    this.k++;
                    this.nbr_sick++
                    vector_sick.push(new Vector(i,j))
                    if(this.stop==true)
                        return
                }
            }
        }
        console.log("k",this.k)


        return vector_sick
		
    }

    draw_simu(vector_sick){
        const v = vector_sick
        for(let index=0;index< v.length;index++){
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(v[index].i,v[index].j,1,1);	
        }
    }


    simu(){

        const vector_sick= this.start_simu()
        this.draw_simu(vector_sick)    
    }



    startSimu_display() {

        clearInterval(this.intervalID);
        const loops = this.defaultLoopsPerInterval;
        this.intervalID = setInterval(
            () => {
          for (let index = 0; index < loops; index++) {

            this.simu();
            document.getElementById("nbr_sick_").innerHTML = this.nbr_sick
            document.getElementById("nbr_pot_sick_").innerHTML = this.nbr_pot_sick


            if(this.k==0){
                return 
            }
            if(this.stop==true){
                return 
            }
       
          }
        }, 1000/this.speed);
      }



    fill_population(){
        let nbr = 0;
        // this.board = math.zeros(this.canvas.width, this.canvas.height)
        for (let i=0;i<this.canvas.width ;i++){
            for(let j=0;j<this.canvas.height;j++){
                let value = Math.random()
                // console.log(value)
                
                this.board.push(new Person(0,i,j))
                if (value < this.proba_sick){
                    nbr++;
                    this.board[i*this.canvas.width+j].setstate(1)
                }
                if (i == 200 && j == 200)
                    this.board[i*this.canvas.width+j].setstate(2)
            }
        }
        this.nbr_pot_sick= nbr-1
    }

    draw_board(){

        for (let i=0;i<this.canvas.width;i++){
            for(let j=0;j<this.canvas.height;j++){

                if (this.board[i*this.canvas.width+j].getstate()==1){
                    this.ctx.fillStyle = "red";
                    this.ctx.fillRect(i,j,1,1);
                }

  
                if (this.board[i*this.canvas.width+j].getstate()==2){
                    this.ctx.fillStyle = "black";
                    this.ctx.fillRect(i,j,1,1);
                }

            }
        }

    }

    checkcase( i ,  j){
        let nbrvoisinouvert=0;
        
        if(i == 0 && j == 0){
            nbrvoisinouvert = this.board[0*this.canvas.width+1].getSpecialetat()+ this.board[1*this.canvas.width+0].getSpecialetat(); 
        }
        else if(i == this.canvas.width - 1 && j == 0){
            nbrvoisinouvert = this.board[i*this.canvas.width+1].getSpecialetat()+ this.board[(i-1)*this.canvas.width+0].getSpecialetat(); 
        }
        else if(i ==  0 && j ==  this.canvas.width-1){
            nbrvoisinouvert = this.board[ this.canvas.width-2].getSpecialetat()+ this.board[1*this.canvas.width+this.canvas.width-1].getSpecialetat(); 
        }
        else if(i == this.canvas.width - 1 && j == this.canvas.width-1){

            nbrvoisinouvert = this.board[(i-1)*this.canvas.width+j].getSpecialetat()+ this.board[i*this.canvas.width+(this.canvas.width-2)].getSpecialetat(); 
        }
        else if(i == 0 && j > 0 && j <  this.canvas.width - 1){

            nbrvoisinouvert = this.board[i*this.canvas.width+j-1].getSpecialetat()+ this.board[i*this.canvas.width+j+1].getSpecialetat()+ this.board[(i+1)*this.canvas.width+j].getSpecialetat(); 
        }
        else if(i == this.canvas.width-1 && j > 0 && j <  this.canvas.width - 1){

            nbrvoisinouvert = this.board[(i-1)*this.canvas.width+j].getSpecialetat()+ this.board[i*this.canvas.width+j-1].getSpecialetat()+ this.board[i*this.canvas.width+j+1].getSpecialetat(); 
        }
        else if(j == 0 && i > 0 && i <  this.canvas.width - 1){

            nbrvoisinouvert = this.board[(i-1)*this.canvas.width+j].getSpecialetat()+ this.board[i*this.canvas.width+j+1].getSpecialetat()+ this.board[(i+1)*this.canvas.width+j].getSpecialetat(); 
        }
        else if(j == this.canvas.width-1 && i > 0 && i <  this.canvas.width - 1){

            nbrvoisinouvert = this.board[(i-1)*this.canvas.width+j].getSpecialetat()+ this.board[i*this.canvas.width+j-1].getSpecialetat()+ this.board[(i+1)*this.canvas.width+j].getSpecialetat(); 
        }
        else{

            nbrvoisinouvert = this.board[(i-1)*this.canvas.width+j].getSpecialetat()+ this.board[i*this.canvas.width+(j-1)].getSpecialetat()+ this.board[(i+1)*this.canvas.width+j].getSpecialetat()+this.board[i*this.canvas.width+(j+1)].getSpecialetat(); 
        }
        return nbrvoisinouvert;
    }
    
    setproba(proba){
        this.proba_sick=proba
    }

}


class Vector{

    constructor(i,j){
        this.i=i
        this.j=j
    }
}