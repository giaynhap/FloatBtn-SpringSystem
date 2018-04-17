
/*
 Spring System:v1
 GiayNhap
 [Javascript]
 */
 (function(window){

 	SpringSystem = function()
 	{
 		this.x= 0;
 		this.y =0;
 		this.root = [0,0]
 		this.point = [0,0]
 		this.vecX = 0;
 		this.vecY = 0;
 		this.r = 1.3;
 		this.k = 0.1;
 		this.isStart = false;
 		this.loop = setInterval(this.__event.bind(this),10)


 	}

 	SpringSystem.prototype = {
 		setRoot:function(x,y){
 			this.root[0]=x;
 			this.root[1]=y;

 		},
 		setPoint:function(x,y){
 			this.point[0]=x;
 			this.point[1]=y;
 		},
 		__event:function()
 		{
 			if (!this.isStart ) return;
 			var vX = (this.point[0]-this.x) 
 			var vY = (this.point[1]-this.y) 
 			this.vecX += this.k * vX;		
 			this.vecY += this.k* vY;
 			this.vecX/=this.r;
 			this.vecY/=this.r;
 			this.x+=this.vecX;
 			this.y+=this.vecY;
 			if ( Math.abs(vX)<0.001 && Math.abs(vY)<0.001 && Math.abs(this.vecX)<0.0001 && Math.abs(this.vecY)<0.0001)
 			{
 				this.isStart = false;
 				if (this.onStop!=null) this.onStop(this.x,this.y);
 			}
 			if (this.onUpdate!=null) this.onUpdate(this.x,this.y)

 		},
 	destroy:function()
 	{
 		clearInterval(this.loop);
 	},
 	start()
 	{
 		this.x = this.root[0];
 		this.y = this.root[1];

 		this.isStart = true;
 	}


 }

 window.SpringSystem = SpringSystem;

}(window))